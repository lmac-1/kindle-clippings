export default function About() {
  return (
    <div className="flex flex-col gap-y-4">
      <h2 className="font-bold text-4xl">About this application</h2>
      <p>
        Your Kindle device quietly collects your highlights, notes, and
        bookmarks into a single text file called "My Clippings.txt." This file
        contains a treasure trove of your reading insights, but it's not
        particularly easy to work with in its raw form.
      </p>
      <p>
        Our application transforms your Kindle clippings into an organised,
        searchable collection that helps you rediscover and make use of your
        reading highlights.
      </p>
      <h3 className="text-2xl mt-3">What Kindle Clippings are</h3>
      <p>
        When you highlight text or add notes on your Kindle device, these
        "clippings" are saved in a text file with a specific format:
      </p>
      <ul className="list-disc list-inside">
        <li>The book title and author</li>
        <li>Your highlight location and timestamp</li>
        <li>The actual highlighted text or note</li>
      </ul>{' '}
      <p>
        {' '}
        This file accumulates all your highlights across every book you've read
        on your Kindle, but Amazon provides limited tools to actually use this
        information effectively.
      </p>
      <h3 className="text-2xl mt-3">What our app does</h3>
      <p>Our application:</p>
      <ul className="list-disc list-inside">
        <li>Parses your "My Clippings.txt" file</li>
        <li>Organises highlights by book and author</li>
        <li>Makes your highlights searchable by keyword</li>
      </ul>
    </div>
  );
}
