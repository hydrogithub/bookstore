import FormBookModal from "@/component/FormBook";
import { getBook } from "@/firebase/Store/bookCollection";
import { Book, InititalBook } from "@/interface/books";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UpdateBook = () => {
  const [book, setBook] = useState<Book | undefined>(undefined);
  const router = useRouter();
  const { id } = router.query as { id?: string };

  const parseDataForm = (book: Book): InititalBook => {
    return {
      ...book,
      name: book.name,
      original_price: book.original_price.toString(),
      discount_rate: book.discount_rate.toString(),
      thumbnail_url: book.thumbnail_url,
      description: book.description,
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await getBook(id);
        if (data) setBook(data);
      }
    };

    fetchData();
  }, []);

  return (
    <>{book && <FormBookModal mode="edit" book={parseDataForm(book)} />}</>
  );
};

export default UpdateBook;
