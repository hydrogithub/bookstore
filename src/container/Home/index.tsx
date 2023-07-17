import CardCPN from "@/component/Card";
import signOut from "@/firebase/Auth/signOut";
import { Book } from "@/interface/books";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { bookCollectionRef } from "@/firebase/Store/bookCollection";
import { APP_ROUTES } from "@/global/constants/appRoutes";
import { onSnapshot } from "firebase/firestore";

const Home = () => {
  const [bookList, setBookList] = useState<Book[] | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const fetchData = onSnapshot(bookCollectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...(doc.data() as Book),
        id: doc.id,
      }));
      setBookList(data);
    });
    return () => {
      fetchData();
    };
  }, []);
  return (
    <>
      <div className="flex justify-end gap-2 p-3">
        <button
          type="button"
          className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          onClick={() => router.push(APP_ROUTES.manage)}
        >
          Manage
        </button>
        <button
          type="button"
          className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          onClick={signOut}
        >
          Logout
        </button>
      </div>
      <div className="container mx-auto px-5 py-4">
        <div className="-m-1 flex flex-wrap gap-x-4 gap-y-3 justify-start">
          {bookList &&
            bookList.length > 0 &&
            bookList.map((book) => <CardCPN key={book.id} {...book} />)}
        </div>
      </div>
    </>
  );
};

export default Home;
