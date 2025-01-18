import React from 'react';

const About = () => {
  return (
    <div>

    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full" src="https://via.placeholder.com/400x200" alt="Card" />
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2">Card Title</h2>
        <p className="text-gray-700 text-base">This is a Tailwind CSS card component.</p>
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
    // <div className="about container-fluid">
    //   <div className="row justify-content-center ">
    //     <div className="col-sm-2"></div> 
    //     <div className="col-sm-8">
    //       <h1 className="text-center mb-4">About Our Blood Bank</h1>
    //       <p className="text-justify">
    //         Welcome to our Blood Bank System! We are committed to saving lives
    //         by ensuring a seamless process for blood donation and request
    //         management. Our system connects donors, blood banks, and hospitals
    //         to ensure that blood is available when it’s needed the most.
    //       </p>
    //       <p className="text-justify">
    //         Our mission is to make sure no one has to face a shortage of blood
    //         in critical times. We work tirelessly with our team of professionals
    //         and volunteers to maintain a reliable inventory of blood supplies
    //         across multiple locations, ensuring safe and timely delivery of
    //         blood units to hospitals and patients in need.
    //       </p>
    //       <h3 className="text-center mt-5">Why Choose Us?</h3>
    //       <ul className="mt-3">
    //         <li>Reliable and fast blood request processing.</li>
    //         <li>Nationwide network of blood banks.</li>
    //         <li>Fully compliant with health and safety standards.</li>
    //         <li>Real-time inventory updates for hospitals and patients.</li>
    //         <li>Donor-friendly platform with regular updates.</li>
    //       </ul>
    //       <p className="text-justify mt-4">
    //         Thank you for choosing us as your trusted partner in saving lives. Whether
    //         you're a donor, a hospital representative, or someone in need of blood,
    //         our platform ensures a smooth, secure, and transparent process every step of the way.
    //       </p>
    //     </div>
    //     <div className="col-sm-2"></div> 
    //   </div>
    // </div>
  );
};

export default About;
