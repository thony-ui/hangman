import HangmanBoard from "./_components/HangmanBoard";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 items-center ">
      <p className="font-bold text-5xl text-center">Let`s play hangman</p>
      <HangmanBoard />
    </div>
  );
}
