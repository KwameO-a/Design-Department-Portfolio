export default function Contact() {
  return (
    <section id="contact" className="bg-white min-h-screen flex flex-col lg:flex-row">
      {/* Left Column – Logo and Intro Text */}
      <div className="lg:w-1/3 p-8 flex flex-col justify-center">
        <img
          src="/images/logo.png"
          alt="Design Department Logo"
          className="w-48 mb-8 mx-auto lg:mx-0"
        />
        <div className="space-y-4 text-sm text-gray-700 text-justify">
          <p>
            We’d love to hear from you. Whether you're starting a new project,
            seeking design collaboration, or simply want to learn more about our
            work, we welcome the conversation.
          </p>
          <p>
            At the heart of what we do is a belief in meaningful engagement, so
            let’s talk about how we can create something exceptional together.
          </p>
        </div>
      </div>

      {/* Center Image */}
      <div
        className="lg:w-1/3 bg-center bg-cover min-h-[500px]"
        style={{ backgroundImage: `url('/images/contact-image.jpg')` }}
        aria-label="Contact showcase"
        role="img"
      />

      {/* Right Column – Heading centered, details left-aligned */}
      <div className="lg:w-1/3 p-8 flex flex-col justify-center items-center">
        {/* Centered, responsive heading */}
        <div className="text-center">
          <h2
            className="font-bold tracking-widest mb-2 leading-none
                       text-3xl sm:text-4xl md:text-5xl"
            style={{ color: '#8b6b52' }}
          >
            OUR
          </h2>
          <h2
            className="font-bold tracking-widest leading-tight
                       text-5xl sm:text-6xl md:text-7xl"
            style={{ color: '#8b6b52' }}
          >
            CONTACT
          </h2>
        </div>

        {/* Left-aligned details; block stays centered */}
        <div className="mt-8 w-full max-w-xs sm:max-w-sm mx-auto text-left text-gray-800 text-sm space-y-4">
          {/* Phone 1 */}
          <a href="tel:+233501369226" className="flex items-center gap-3 group">
            <img src="/images/call.png" alt="" className="w-5 h-5 opacity-80 group-hover:opacity-100" />
            <span className="underline-offset-4 group-hover:underline">
              +233 50 136 9226
            </span>
          </a>

          {/* Phone 2 */}
          <a href="tel:+233501369074" className="flex items-center gap-3 group">
            <img src="/images/call.png" alt="" className="w-5 h-5 opacity-80 group-hover:opacity-100" />
            <span className="underline-offset-4 group-hover:underline">
              +233 50 136 9074
            </span>
          </a>

          {/* Email */}
          <a href="mailto:business@designdepartment.work" className="flex items-center gap-3 group">
            <img
              src="/images/icons8-email-50.png"
              alt=""
              className="w-5 h-5 opacity-80 group-hover:opacity-100"
            />
            <span className="underline-offset-4 group-hover:underline">
              business@designdepartment.work
            </span>
          </a>

          {/* Location */}
          <div className="flex items-center gap-3">
            <img src="/images/location.png" alt="" className="w-5 h-5 opacity-80" />
            <span>Accra, Ghana</span>
          </div>
        </div>
      </div>
    </section>
  );
}
