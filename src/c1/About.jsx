import React from "react";

const About = () => {
  return (
    <div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <img
          className="w-full"
          src="https://via.placeholder.com/400x200"
          alt="Card"
        />
        <div className="px-6 py-4">
          <h2 className="font-bold text-xl mb-2">Card Title</h2>
          <p className="text-gray-700 text-base">
            This is a Tailwind CSS card component test.
          </p>
        </div>
      </div>

      <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center gap-x-4">
        <div class="shrink-0">
          <img class="size-12" src="/img/logo.svg" alt="ChitChat Logo" />
        </div>
        <div>
          <div class="text-xl font-medium text-black">ChitChat</div>
          <p class="text-slate-500">You have a new message!</p>
        </div>
      </div>
    </div>
  );
};

export default About;
