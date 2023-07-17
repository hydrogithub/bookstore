import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config";
import { Book } from "@/interface/books";

export const bookCollectionRef = collection(db, "books");

export const getBooks = async () => {
  const data = await getDocs(bookCollectionRef);
  const filteredData = data.docs.map((doc) => ({
    ...(doc.data() as Book),
    id: doc.id,
  }));
  return filteredData;
};

export const getBook = async (id: string): Promise<Book> => {
  const data = await getDoc(doc(bookCollectionRef, id));
  return {
    ...data.data(),
    id: data.id,
  } as Book;
};

export const addBook = async (book: Book) => {
  const response = await addDoc(bookCollectionRef, book);
  return response;
};

export const editBook = async (id: string, book: Book) => {
  const bookDoc = await doc(bookCollectionRef, id);
  const response = await updateDoc(bookDoc, { ...book });
  return response;
};

export const deleteBook = async (id: string) => {
  const bookDoc = await doc(bookCollectionRef, id);
  const response = await deleteDoc(bookDoc);
  return response;
};
