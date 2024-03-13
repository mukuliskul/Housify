import Link from "next/link";

export default function Services() {
    return (
      <div className="h-[8vh] text-black kumbh-sans-font">
          <h1 className="text-4xl font-bold text-primary mb-10">TO-DO !!!</h1>
          <p className="mb-5">
            Add links to services.!
          </p>
          <Link href="/interpret" passHref legacyBehavior>
			<a className="text-2xl underline">Interpreter</a>
		</Link>
        </div>
    );
  }
  