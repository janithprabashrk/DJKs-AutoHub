export default function CreateListing() {
  return (
    <main>
      <h1 className="text-3xl text-center font-bold my-7">Create a Listing</h1>
      <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <input type="text" placeholder="Title" id="title" className="w-full border rounded-lg p-3" />
      </form>
    </main>
  )
}
