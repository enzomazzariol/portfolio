import Subtitle from './subtitle.jsx';

export default function Contact() {
  return (
    <div className="flex flex-col mb-10 mx-auto">
      <div className="flex justify-center items-center">
        <form
          action="https://getform.io/f/bnlldomb"
          method="POST"
          data-netlify="true"
          className="flex flex-col w-full md:w-7/12"
        >
          <Subtitle>Contacto</Subtitle>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            className="p-2 bg-transparent border-2 rounded-md focus:outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="my-2 p-2 bg-transparent border-2 rounded-md focus:outline-none"
            required
          />

          <textarea
            name="message"
            placeholder="Mensaje"
            rows="10"
            className="p-2 mb-4 bg-transparent border-2 rounded-md focus:outline-none"
            required
          />

          <button
            type="submit"
            className="text-center inline-block px-8 py-3 w-max text-base 
            font-medium rounded-md text-white bg-gradient-to-r from-yellow-500 to-pink-800 drop-shadow-md"
          >
            Work with me
          </button>
        </form>
      </div>
    </div>
  );
}