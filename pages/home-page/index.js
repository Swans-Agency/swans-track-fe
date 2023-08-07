import React from 'react';


export default function index() {
    return (
        <div class="container mx-auto py-10">
            <header class="text-center mb-8">
                <h1 class="text-3xl font-bold">Welcome to Swans Track</h1>
                <p class="text-gray-600">Empower Your Business with Smart Financial Management</p>
            </header>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="bg-white rounded p-6 shadow">
                    <h3 class="text-xl font-semibold mb-2">Streamlined Financial Management</h3>
                    <p>Say goodbye to manual tracking. Easily categorize financial data and gain insights.</p>
                </div>
                <div class="bg-white rounded p-6 shadow">
                    <h3 class="text-xl font-semibold mb-2">Client Management Made Easy</h3>
                    <p>Effortlessly manage clients and make informed decisions to enhance your strategies.</p>
                </div>
                <div class="bg-white rounded p-6 shadow">
                    <h3 class="text-xl font-semibold mb-2">Google Integration</h3>
                    <p>Schedule events, set up meetings, and receive notifications with seamless Google integration.</p>
                </div>
                <div class="bg-white rounded p-6 shadow">
                    <h3 class="text-xl font-semibold mb-2">Downloadable Excel Reports</h3>
                    <p>Download Excel reports for custom analysis and deeper business performance understanding.</p>
                </div>
                <div class="bg-white rounded p-6 shadow">
                    <h3 class="text-xl font-semibold mb-2">Automatic PDF Proposals and Invoices</h3>
                    <p>Create and generate polished proposals and invoices with just a few clicks.</p>
                </div>
            </div>
            <div class="text-center mt-8">
                <a href="/" class="btn btn-secondary">Learn More</a>
            </div>
        </div>
    );
};