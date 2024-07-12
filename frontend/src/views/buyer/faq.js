import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import axios from 'axios';

const FileUpload = ({ userId }) => {
  const [idTicketDepartment, setIdTicketDepartment] = useState('');
  const [ticketDepartments, setTicketDepartments] = useState([]);
  const [ticketDescription, setTicketDescription] = useState('');
  const [activeDiv, setActiveDiv] = useState(1);

  useEffect(() => {
    const fetchTicketDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/ticketdepartment');
        setTicketDepartments(response.data.map(department => ({
          value: department.idTicketDepartment.toString(),
          label: department.ticketDepartment
        })));
      } catch (error) {
        console.error('Error fetching ticket departments:', error);
      }
    };

    fetchTicketDepartments();
  }, []); 

  const handleButtonClick = (event) => {
    const divId = parseInt(event.target.id.replace("button-", ""), 10);
    setActiveDiv(divId);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/ticket/create', {
        idTicketDepartment,
        ticketDescription,
        ticketDate: new Date().toISOString(),
        idUser: userId
      });

      console.log('Ticket created:', response.data); // Handle success response
      // Reset form fields if needed
      setIdTicketDepartment('');
      setTicketDescription('');
    } catch (error) {
      console.error('Error creating ticket:', error); // Handle error
    }
  };


  const getButtonStyle = (buttonId) => {
    return {
      backgroundColor: activeDiv === buttonId ? "#10ccf4" : "white",
      color: activeDiv === buttonId ? "white" : "black",
    };
  };


  return (
    <section className="bsb-faq-3 py-3 py-md-5 py-xl-8">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
            <h2 className="mb-4 display-5 text-center">
              <b>
                Having some troubles?
                <br />
                Let’s see if we can help you on a easier way
              </b>
            </h2>
            <p className="mb-5 text-center">
              In order to help you, we provide several frequently asked
              questions to help you resolve your problem more easily and
              quickly.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 roundbg shadow m-4">
        <p className="my-auto">
          <b>1. FAQ</b>
        </p>
      </div>

      <div className="col-7 d-flex justify-content-around my-5 mx-auto">
        <button
          id="button-1"
          onClick={handleButtonClick}
          style={getButtonStyle(1)}
          className="hover roundbg py-3 px-4 border-0 mx-4 shadow col-3 text-center"
        >
          <b style={{ pointerEvents: "none" }}>Installation</b>
        </button>
        <button
          id="button-2"
          onClick={handleButtonClick}
          style={getButtonStyle(2)}
          className="hover roundbg py-3 px-4 border-0 mx-4 shadow col-3 text-center"
        >
          <b style={{ pointerEvents: "none" }}>Licenses</b>
        </button>
        <button
          id="button-3"
          onClick={handleButtonClick}
          style={getButtonStyle(3)}
          className="hover roundbg py-3 px-4 border-0 mx-4 shadow col-3 text-center"
        >
          <b style={{ pointerEvents: "none" }}>Payment</b>
        </button>
      </div>
      <div>
        <div class="mb-8" style={{ display: activeDiv === 1 ? "block" : "none" }}>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-11 col-xl-10">
                <div class="accordion accordion-flush" id="faqAccount">
                  <div class="accordion-item bg-transparent border-top border-bottom py-3">
                    <h2 class="accordion-header" id="faqAccountHeading1">
                      <button
                        class="accordion-button collapsed bg-transparent fw-bold shadow-none link-primary"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faqAccountCollapse1"
                        aria-expanded="false"
                        aria-controls="faqAccountCollapse1"
                      >
                        How do I install the application?
                      </button>
                    </h2>
                    <div
                      id="faqAccountCollapse1"
                      class="accordion-collapse collapse"
                      aria-labelledby="faqAccountHeading1"
                    >
                      <div class="accordion-body">
                        <p>
                          <strong>Step 1:</strong> Download the installer from the
                          official website.
                          <br />
                          <strong>Step 2:</strong> Run the installer and follow
                          the on-screen instructions.
                          <br />
                          <strong>Step 3:</strong> Once installation is complete,
                          launch the application from the start menu or desktop
                          shortcut.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item bg-transparent border-bottom py-3">
                    <h2 class="accordion-header" id="faqAccountHeading2">
                      <button
                        class="accordion-button collapsed bg-transparent fw-bold shadow-none link-primary"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faqAccountCollapse2"
                        aria-expanded="false"
                        aria-controls="faqAccountCollapse2"
                      >
                        The installer won't run on my computer. What should I do?
                      </button>
                    </h2>
                    <div
                      id="faqAccountCollapse2"
                      class="accordion-collapse collapse"
                      aria-labelledby="faqAccountHeading2"
                    >
                      <div class="accordion-body">
                        <p>
                          Ensure your operating system meets the minimum system
                          requirements.
                          <br />
                          Right-click the installer file and select "Run as
                          administrator."
                          <br />
                          Disable any antivirus software temporarily, as it might
                          be blocking the installer.
                          <br />
                          Download the installer again to ensure it's not
                          corrupted.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item bg-transparent border-bottom py-3">
                    <h2 class="accordion-header" id="faqAccountHeading3">
                      <button
                        class="accordion-button collapsed bg-transparent fw-bold shadow-none link-primary"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faqAccountCollapse3"
                        aria-expanded="false"
                        aria-controls="faqAccountCollapse3"
                      >
                        I'm getting an error message saying "Insufficient
                        permissions." How can I fix this?
                      </button>
                    </h2>
                    <div
                      id="faqAccountCollapse3"
                      class="accordion-collapse collapse"
                      aria-labelledby="faqAccountHeading3"
                    >
                      <div class="accordion-body">
                        <p>
                          Run the installer as an administrator by right-clicking
                          on the installer and selecting "Run as administrator."
                          <br />
                          Ensure you are logged in as a user with administrative
                          rights
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item bg-transparent border-bottom py-3">
                    <h2 class="accordion-header" id="faqAccountHeading4">
                      <button
                        class="accordion-button collapsed bg-transparent fw-bold shadow-none link-primary"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faqAccountCollapse4"
                        aria-expanded="false"
                        aria-controls="faqAccountCollapse4"
                      >
                        The installation process gets stuck at a certain point and
                        doesn't progress. What can I do?
                      </button>
                    </h2>
                    <div
                      id="faqAccountCollapse4"
                      class="accordion-collapse collapse"
                      aria-labelledby="faqAccountHeading4"
                    >
                      <div class="accordion-body">
                        <p>
                          Cancel the installation and restart your computer.
                          <br />
                          Make sure there are no other installations or updates
                          running in the background.
                          <br />
                          Try disabling your antivirus software temporarily and
                          attempt the installation again.
                          <br />
                          Ensure you have enough disk space and memory available.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item bg-transparent border-bottom py-3">
                    <h2 class="accordion-header" id="faqAccountHeading5">
                      <button
                        class="accordion-button collapsed bg-transparent fw-bold shadow-none link-primary"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faqAccountCollapse5"
                        aria-expanded="false"
                        aria-controls="faqAccountCollapse5"
                      >
                        The application crashes immediately after launching. What
                        should I do?
                      </button>
                    </h2>
                    <div
                      id="faqAccountCollapse5"
                      class="accordion-collapse collapse"
                      aria-labelledby="faqAccountHeading5"
                    >
                      <div class="accordion-body">
                        <p>
                          Check for any available updates for the application and
                          install them.
                          <br />
                          Ensure your graphics drivers and other system drivers
                          are up to date.
                          <br />
                          Run the application as an administrator.
                          <br />
                          If the problem persists, reinstall the application.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-8" style={{ display: activeDiv === 2 ? "block" : "none" }}>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-11 col-xl-10">
                <div class="accordion accordion-flush" id="faqOrder">
                  <div class="accordion-item bg-transparent border-top border-bottom py-3">
                    <h2 class="accordion-header" id="faqOrderHeading1">
                      <button
                        class="accordion-button collapsed bg-transparent fw-bold shadow-none link-primary"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faqOrderCollapse1"
                        aria-expanded="false"
                        aria-controls="faqOrderCollapse1"
                      >
                        I purchased a license, but the application still shows as
                        unlicensed. What should I do?
                      </button>
                    </h2>
                    <div
                      id="faqOrderCollapse1"
                      class="accordion-collapse collapse"
                      aria-labelledby="faqOrderHeading1"
                    >
                      <div class="accordion-body">
                        <p>
                          <strong>Step 1:</strong> Double-check the license key or
                          activation code you entered for typos or errors.
                          <br />
                          <strong>Step 2:</strong> Ensure you followed the correct
                          activation process provided by the software vendor.
                          <br />
                          <strong>Step 3:</strong> Contact customer support with
                          proof of purchase to verify and resolve the issue.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item bg-transparent border-bottom py-3">
                    <h2 class="accordion-header" id="faqOrderHeading2">
                      <button
                        class="accordion-button collapsed bg-transparent fw-bold shadow-none link-primary"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faqOrderCollapse2"
                        aria-expanded="false"
                        aria-controls="faqOrderCollapse2"
                      >
                        My license key is being rejected as invalid. What could be
                        the issue?
                      </button>
                    </h2>
                    <div
                      id="faqOrderCollapse2"
                      class="accordion-collapse collapse"
                      aria-labelledby="faqOrderHeading2"
                    >
                      <div class="accordion-body">
                        <p>
                          <strong>Reasons:</strong> Ensure the license key matches
                          the product version you are installing.
                          <br />
                          <strong>Check:</strong> Verify if the license key has
                          expired or if it is for a different product or edition.
                          <br />
                          <strong>Support:</strong> Contact the vendor's support
                          team for assistance in validating or reissuing the
                          license key.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item bg-transparent border-bottom py-3">
                    <h2 class="accordion-header" id="faqOrderHeading3">
                      <button
                        class="accordion-button collapsed bg-transparent fw-bold shadow-none link-primary"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faqOrderCollapse3"
                        aria-expanded="false"
                        aria-controls="faqOrderCollapse3"
                      >
                        I need to transfer my license to a new computer. How can I
                        do this?
                      </button>
                    </h2>
                    <div
                      id="faqOrderCollapse3"
                      class="accordion-collapse collapse"
                      aria-labelledby="faqOrderHeading3"
                    >
                      <div class="accordion-body">
                        <p>
                          <strong>Procedure:</strong> Deactivate the license on
                          the old computer if required by the software.
                          <br />
                          <strong>Activation:</strong> Install the software on the
                          new computer and activate it using your existing license
                          key.
                          <br />
                          <strong>Support:</strong> Some vendors may require you
                          to contact support to manage license transfers.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item bg-transparent border-bottom py-3">
                    <h2 class="accordion-header" id="faqOrderHeading4">
                      <button
                        class="accordion-button collapsed bg-transparent fw-bold shadow-none link-primary"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faqOrderCollapse4"
                        aria-expanded="false"
                        aria-controls="faqOrderCollapse4"
                      >
                        I accidentally exceeded the number of allowed
                        installations with my license. What now?
                      </button>
                    </h2>
                    <div
                      id="faqOrderCollapse4"
                      class="accordion-collapse collapse"
                      aria-labelledby="faqOrderHeading4"
                    >
                      <div class="accordion-body">
                        <p>
                          <strong>Resolution:</strong> Check if your license
                          allows for multiple installations or if it's tied to a
                          specific number of devices.
                          <br />
                          <strong>Support:</strong> Contact the vendor's support
                          team to explain the situation and request assistance in
                          resolving the issue.
                          <br />
                          <strong>Upgrade:</strong> Consider upgrading your
                          license to accommodate additional installations if
                          needed.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item bg-transparent border-bottom py-3">
                    <h2 class="accordion-header" id="faqOrderHeading5">
                      <button
                        class="accordion-button collapsed bg-transparent fw-bold shadow-none link-primary"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faqOrderCollapse5"
                        aria-expanded="false"
                        aria-controls="faqOrderCollapse5"
                      >
                        My software is showing as pirated or unauthorized, but I
                        purchased a legitimate license. How can I fix this?
                      </button>
                    </h2>
                    <div
                      id="faqOrderCollapse5"
                      class="accordion-collapse collapse"
                      aria-labelledby="faqOrderHeading5"
                    >
                      <div class="accordion-body">
                        <p>
                          <strong>Verification:</strong> Provide proof of
                          purchase, such as receipts or order confirmation emails,
                          to the software vendor.
                          <br />
                          <strong>Resolution:</strong> Contact customer support
                          immediately to rectify the licensing status and resolve
                          any issues with activation.
                          <br />
                          <strong>Legal:</strong> Avoid using or distributing
                          pirated software, as it may lead to legal consequences
                          and security risks.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-0" style={{ display: activeDiv === 3 ? "block" : "none" }}>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-11 col-xl-10">
                <div class="accordion accordion-flush" id="faqRefund">
                  <div class="accordion-item bg-transparent border-top border-bottom py-3">
                    <h2 class="accordion-header" id="faqRefundHeading1">
                      <button
                        class="accordion-button collapsed bg-transparent fw-bold shadow-none link-primary"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faqRefundCollapse1"
                        aria-expanded="false"
                        aria-controls="faqRefundCollapse1"
                      >
                        What payment methods do you accept?
                      </button>
                    </h2>
                    <div
                      id="faqRefundCollapse1"
                      class="accordion-collapse collapse"
                      aria-labelledby="faqRefundHeading1"
                    >
                      <div class="accordion-body">
                        <p>
                          We accept several payment methods, including credit
                          cards (Visa, MasterCard, American Express), PayPal, bank
                          transfers, and sometimes digital wallets like Apple Pay
                          or Google Pay. Please check our payment page or contact
                          support for the latest information on accepted methods.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item bg-transparent border-bottom py-3">
                    <h2 class="accordion-header" id="faqRefundHeading2">
                      <button
                        class="accordion-button collapsed bg-transparent fw-bold shadow-none link-primary"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faqRefundCollapse2"
                        aria-expanded="false"
                        aria-controls="faqRefundCollapse2"
                      >
                        Is my payment information secure?
                      </button>
                    </h2>
                    <div
                      id="faqRefundCollapse2"
                      class="accordion-collapse collapse"
                      aria-labelledby="faqRefundHeading2"
                    >
                      <div class="accordion-body">
                        <p>
                          Yes, we take security seriously. We use
                          industry-standard encryption protocols to ensure your
                          payment information is protected. Additionally, we
                          comply with PCI-DSS (Payment Card Industry Data Security
                          Standard) requirements for handling payment data
                          securely.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item bg-transparent border-bottom py-3">
                    <h2 class="accordion-header" id="faqRefundHeading3">
                      <button
                        class="accordion-button collapsed bg-transparent fw-bold shadow-none link-primary"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faqRefundCollapse3"
                        aria-expanded="false"
                        aria-controls="faqRefundCollapse3"
                      >
                        I encountered an error during payment. What should I do?
                      </button>
                    </h2>
                    <div
                      id="faqRefundCollapse3"
                      class="accordion-collapse collapse"
                      aria-labelledby="faqRefundHeading3"
                    >
                      <div class="accordion-body">
                        <p>
                          <strong>Retry:</strong> Refresh the page and try
                          completing the payment again.
                          <br />
                          <strong>Check Details:</strong> Ensure the payment
                          details (credit card number, expiration date, CVV) are
                          entered correctly.
                          <br />
                          <strong>Contact Support:</strong> If the issue persists,
                          contact our support team with details of the error
                          message or screenshot for assistance.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item bg-transparent border-bottom py-3">
                    <h2 class="accordion-header" id="faqRefundHeading4">
                      <button
                        class="accordion-button collapsed bg-transparent fw-bold shadow-none link-primary"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faqRefundCollapse4"
                        aria-expanded="false"
                        aria-controls="faqRefundCollapse4"
                      >
                        When will my credit card be charged?
                      </button>
                    </h2>
                    <div
                      id="faqRefundCollapse4"
                      class="accordion-collapse collapse"
                      aria-labelledby="faqRefundHeading4"
                    >
                      <div class="accordion-body">
                        <p>
                          Your credit card will typically be charged immediately
                          upon completing the payment process. In some cases,
                          especially for subscriptions or pre-orders, charges may
                          occur at specific intervals or when the product or
                          service is delivered.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item bg-transparent border-bottom py-3">
                    <h2 class="accordion-header" id="faqRefundHeading5">
                      <button
                        class="accordion-button collapsed bg-transparent fw-bold shadow-none link-primary"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faqRefundCollapse5"
                        aria-expanded="false"
                        aria-controls="faqRefundCollapse5"
                      >
                        Can I get a refund if I change my mind after making a
                        payment?
                      </button>
                    </h2>
                    <div
                      id="faqRefundCollapse5"
                      class="accordion-collapse collapse"
                      aria-labelledby="faqRefundHeading5"
                    >
                      <div class="accordion-body">
                        <p>
                          <strong>Policy Review:</strong> Review our refund policy on our website
                          or contact customer support for details.
                          <br />
                          <strong>Conditions:</strong> Refunds may be available within a certain
                          timeframe or under specific conditions outlined in our
                          policy.
                          <br />
                          <strong>Process:</strong> To request a refund, contact our support team
                          with your purchase details, reason for the refund, and
                          any required documentation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container mt-5">
          <div class="row justify-content-md-center">
            <div class="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
              <h2 class="mb-4 display-5 text-center">
                <b>Have you still not been able to resolve your problem?</b>
              </h2>
              <p class="mb-5 text-center">
                In addition to the FAQ's, we have a way for you to contact our
                specialist technicians to help you in the best way possible.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 roundbg shadow m-4">
        <p className="my-auto">
          <b>2. Tickets</b>
        </p>
      </div>

      <div className="file-upload mx-auto col-10 text-center bg-white shadow roundbg p-4">
      <form onSubmit={handleSubmit}>
          <h5 className="mb-4 text-center col-10 mx-auto mt-3">
            <b>Select the category for your ticket to get a faster response</b>
          </h5>

          <div className="col-12 d-flex justify-content-around my-5 mx-auto">
            <Select options={ticketDepartments} onChange={(selectedOption) => setIdTicketDepartment(selectedOption.value)} />
          </div>

          <div className="form-group col-10 mx-auto">
            <textarea
              className="form-control mb-4 border-info"
              id="ticketDescription"
              rows="3"
              placeholder="Description"
              value={ticketDescription}
              onChange={(e) => setTicketDescription(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-info mt-4 p-3 w-100"
            style={{ color: "white" }}
          >
            Send Ticket
          </button>
        </form>
      </div>
    </section>
  );
};

export default FileUpload;
