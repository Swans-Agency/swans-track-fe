import React from 'react';


export default function index() {
  return (
    <div className='desktop:px-[20rem] tablet:px-[10rem] phone:px-5 text-left pt-10 pb-24 text-textIcons'>
      <h1 className='text-[2rem] font-black'>Privacy Policy</h1>
      <p className='text-sm'>Effective Date: June 19, 2023</p>

      <h2 className='text-[1.5rem] font-bold pt-4'>1. Collection of Personal Information</h2>
      <p>We may collect the following types of personal information from users:</p>
      <ul className='pl-5 mt-2 space-y-1 list-disc list-inside'>
        <li>Contact information, such as name, email address, and phone number.</li>
        <li>Financial information, such as billing and payment details.</li>
        <li>Client information, including client names and contact details.</li>
        <li>User-generated content, such as invoices, proposals, and tasks.</li>
        <li>Usage data, including IP address, browser type, and operating system.</li>
      </ul>

      <h2 className='text-[1.5rem] font-bold pt-4'>2. Use of Personal Information</h2>
      <p>We may use the personal information we collect for the following purposes:</p>
      <ul className='pl-5 mt-2 space-y-1 list-disc list-inside'>
        <li>Providing and improving our web app's functionality and services.</li>
        <li>Managing user accounts, including client and team member information.</li>
        <li>Generating and processing invoices, proposals, and other user-generated content.</li>
        <li>Communicating with users regarding updates, new features, and support.</li>
        <li>Analyzing user preferences, trends, and usage patterns to enhance user experience.</li>
        <li>Enforcing our terms of service and preventing unauthorized activities.</li>
      </ul>

      <h2 className='text-[1.5rem] font-bold pt-4'>3. Disclosure of Personal Information</h2>
      <p>We may disclose personal information to third parties in the following circumstances:</p>
      <ul className='pl-5 mt-2 space-y-1 list-disc list-inside'>
        <li>With the user's explicit consent.</li>
        <li>To trusted service providers who assist us in operating and maintaining our web app.</li>
        <li>When required by law or to comply with legal obligations.</li>
        <li>To protect our rights, property, or safety, as well as that of our users or others.</li>
        <li>In connection with a merger, acquisition, or sale of assets.</li>
      </ul>

      <h2 className='text-[1.5rem] font-bold pt-4'>4. Data Security</h2>
      <p>We take appropriate security measures to protect personal information against unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the internet or electronic storage is 100% secure.</p>

      <h2 className='text-[1.5rem] font-bold pt-4'>5. Third-Party Links and Integration</h2>
      <p>Our web app may contain links to third-party websites or services that are not under our control. We are not responsible for the privacy practices or content of such third parties. We encourage users to review the privacy policies of these third-party websites or services before providing any personal information.</p>

      <h2 className='text-[1.5rem] font-bold pt-4'>6. Your Choices and Rights</h2>
      <p>Users have the right to access, correct, or delete their personal information. They may also have the right to withdraw consent or object to certain data processing activities. To exercise these rights, please contact us using the information provided below.</p>

      <h2 className='text-[1.5rem] font-bold pt-4'>7. Changes to this Privacy Policy</h2>
      <p>We reserve the right to update or modify this Privacy Policy at any time. Any changes will be effective immediately upon posting the updated Privacy Policy on our web app.</p>

      <h2 className='text-[1.5rem] font-bold pt-4'>8. Contact Us</h2>
      <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at support@swanstrack.com.</p>
    </div>
  );
};