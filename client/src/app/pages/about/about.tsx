import Header from "../../../components/header/header";
import { Link } from "react-router-dom";
export default function About() {
  return (
    <>
      <Header />
      <div className="bg-gray-500">
        <h1 className="text-teal-500 dark:text-white">About</h1>
        <Link className="outline text-pink-500" to="/">
          Back
        </Link>
      </div>
    </>
  );
}
