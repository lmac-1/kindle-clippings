import { UploadClippings } from '@/components/UploadClippings';

export default function Home() {
  return (
    <div className="flex items-start flex-col gap-8">
      <div>
        <h2 className="font-bold text-4xl mb-3">
          Rediscover your Kindle highlights
        </h2>
        <p className="text-gray-700 font-light">
          Upload, search and revisit the best parts of every book you've read.
        </p>
      </div>
      <div>
        <h3 className="font-bold text-xl mb-2">How to find your clippings</h3>
        <ol className="list-decimal ml-4">
          <li>Connect your Kindle to your computer via USB</li>
          <li>
            Find the <strong className="font-semibold">Documents</strong> folder
            of your Kindle
          </li>
          <li>
            You should see a{' '}
            <strong className="font-semibold">My Clippings.txt</strong> file
          </li>
          <li>Upload the file here to get started</li>
        </ol>
      </div>
      <UploadClippings />
    </div>
  );
}
