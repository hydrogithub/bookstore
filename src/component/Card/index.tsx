import { Book } from "@/interface/books";
import { formatCurrency } from "@/ultils";

const CardCPN: React.FC<Book> = (book) => {
  return (
    <div className="max-w-[190px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="w-full rounded-t-lg object-cover"
          src={
            book.thumbnail_url ||
            "https://cdn2.iconfinder.com/data/icons/business-office-6/100/f-01-512.png"
          }
          alt=""
        />
      </a>
      <div className="p-4">
        <a href="#">
          <h5 className="mb-2 text-[12px] tracking-tight text-gray-900 dark:text-white">
            {book.name}
          </h5>
        </a>
        <div className="flex flex-wrap items-center w-full">
          <div className="text-[16px] font-medium">
            {formatCurrency(book.price)}
            <sup>₫</sup>
          </div>
          <div className="px-[4px] ml-[5px] text-[12px] rounded-[5px] bg-slate-200">
            -{book.discount_rate}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCPN;
