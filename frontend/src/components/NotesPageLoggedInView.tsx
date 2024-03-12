import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Note as NoteModel } from "../models/note";
import styles from "../styles/NotesPage.module.css";
import styleUtils from "../styles/utils.module.css";
import AddEditNoteDialog from "./AddEditNoteDialog";

import * as notesApi from "../network/notes_api";
import Note from "./Note";



const NotesPageLoggedInView = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadnigError, setShowNotesLoadingError] = useState(false);

  const fetchNotes = async () => {
    try {
      setShowNotesLoadingError(false);
      setNotesLoading(true);
      const notes = await notesApi.getNotes();
      setNotes(notes);
    } catch (error) {
      console.error(error);
      setShowNotesLoadingError(true);
    } finally {
      setNotesLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await notesApi.deleteNote(note._id);
      setNotes(notes.filter((exsistNote) => exsistNote._id !== note._id));
    } catch (error) {
      console.log(error);
    }
  }

  const notesGrid = (
    <Row xs={1} md={2} lg={3} className={`g-4 ${styles.notesGrid}`}>
      {notes.map((note) => (
        <Col key={note._id}>
          <Note
            note={note}
            className={styles.note}
            onDeleteNote={deleteNote}
            onNoteClick={setNoteToEdit}
          />
        </Col>
      ))}
    </Row>
  );

  return (
    <>
      <Button
        onClick={() => setShowAddNoteDialog(true)}
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
      >
        <FaPlus />
        Add new Note
      </Button>
      {notesLoading && <Spinner animation="border" variant="primary" />}
      {showNotesLoadnigError && (
        <p>Something went wrong. Please refresh hte page</p>
      )}
      {!notesLoading && !showNotesLoadnigError && (
        <>
          {notes.length > 0 ? notesGrid : <p>You don't have any notes yet</p>}
        </>
      )}

      {showAddNoteDialog && (
        <AddEditNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
        />
      )}
      {noteToEdit && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updateNote) => {
            setNotes(
              notes.map((exsistNote) =>
                exsistNote._id === updateNote._id ? updateNote : exsistNote
              )
            );
            setNoteToEdit(null);
          }}
        />
      )}
    </>
  );
};

export default NotesPageLoggedInView;
