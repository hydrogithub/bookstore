import { Book } from "@/interface/books";
import { formatCurrency } from "@/ultils";
import { useRouter } from "next/router";
import { APP_ROUTES } from "@/global/constants/appRoutes";
import { bookCollectionRef, deleteBook } from "@/firebase/Store/bookCollection";
import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";

const Table = () => {
  const [books, setBooks] = useState<Book[] | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const fetchData = onSnapshot(bookCollectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...(doc.data() as Book),
        id: doc.id,
      }));
      setBooks(data);
    });
    return () => {
      fetchData();
    };
  }, []);

  const handleEditBtn = (id: string) => {
    router.push(APP_ROUTES.updateBook(id));
  };
  const handleDeleteBtn = async (id: string) => {
    await deleteBook(id);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Book name
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity sold
              </th>
              <th scope="col" className="px-6 py-3">
                Original Price
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {books && books.length > 0 ? (
              books.map((book) => {
                return (
                  <tr
                    key={book.id}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  >
                    <td
                      scope="row"
                      className="flex gap-1 items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="w-[100px]">
                        <img
                          className="w-full rounded-t-lg object-cover"
                          src={
                            book.thumbnail_url ||
                            "https://cdn2.iconfinder.com/data/icons/business-office-6/100/f-01-512.png"
                          }
                          alt="thumbnail"
                        />
                      </div>
                      {book.name}
                    </td>
                    <td className="px-6 py-4">{book.all_time_quantity_sold}</td>
                    <td className="px-6 py-4">
                      {formatCurrency(book.original_price)}
                      <sup>₫</sup>
                    </td>
                    <td className="px-6 py-4">
                      {formatCurrency(book.price)}
                      <sup>₫</sup>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-4">
                        <button
                          className="rounded outline-none text-orange-500 text-sm font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-primary-600"
                          onClick={() => book.id && handleEditBtn(book.id)}
                        >
                          Edit
                        </button>

                        <button
                          className="rounded outline-none text-red-500 text-sm font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-primary-600"
                          onClick={() => book.id && handleDeleteBtn(book.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="w-full p-5 text-center" colSpan={5}>
                  You don't have any books
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
