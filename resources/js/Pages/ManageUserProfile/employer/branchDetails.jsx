import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { FaPlus, FaEdit } from "react-icons/fa";
import AddBranchModal from "@/components/companyProfile/addBranchModal";
import AddSiteModal from "@/components/companyProfile/addSiteModal";
import EditBranchModal from "@/components/companyProfile/editBranchModal";
import EditSiteModal from "@/components/companyProfile/editSiteModal";
import Modal from "@/components/companyProfile/modal";
import { Head, usePage } from "@inertiajs/react";
import DefaultLayout from "@/layout/defaultLayout";

export default function BranchAndSiteDetails({ branches, companyID }) {
  const { flash } = usePage().props;

  const [isAddBranchModalOpen, setIsAddBranchModalOpen] = useState(false);
  const [isEditBranchModalOpen, setIsEditBranchModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null); // Display the first branch by default
  const [isAddSiteModalOpen, setIsAddSiteModalOpen] = useState(false);
  const [isEditSiteModalOpen, setIsEditSiteModalOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const branchesPerPage = 1; // Display only one branch per page
  const totalPages = Math.ceil(branches.length / branchesPerPage);

  const indexOfLastBranch = currentPage * branchesPerPage;
  const indexOfFirstBranch = indexOfLastBranch - branchesPerPage;
  const currentBranches = branches.slice(indexOfFirstBranch, indexOfLastBranch);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (flash.success) {
      Swal.fire({
        title: 'Success!',
        text: flash.success,
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#2563EB'
      });
    }
  }, [flash]);

  useEffect(() => {
    // Set the selectedBranch to the first branch of the current page if available
    setSelectedBranch(currentBranches[0] || null);
  }, [currentBranches]);



  const handleAddBranchModalOpen = () => {
    setIsAddBranchModalOpen(true);
  };

  const handleEditBranchModalOpen = () => {
    setIsEditBranchModalOpen(true);
  };

  const handleAddSiteModalOpen = (branch) => {
    setSelectedBranch(branch);
    setIsAddSiteModalOpen(true);
  };

  const handleEditSiteModalOpen = (site) => {
    setSelectedSite(site);
    setIsEditSiteModalOpen(true);
  };


  return (
    <DefaultLayout>
      <div className="bg-gray-200 px-4 py-4 min-h-screen overflow-y-auto lg:py-4">
        <Head title="Branch and Site Details" />
        <div className="lg:w-3/4 h-fit-content p-4 mx-auto my-2 bg-white border border-gray-900 rounded-lg">
          <h5 className="text-lg ml-1 font-bold tracking-tight text-gray-900 flex justify-between">
            Branch Details
            <FaPlus
              size={18}
              className="text-gray-900 cursor-pointer"
              onClick={handleAddBranchModalOpen}
            />
          </h5>
          <hr className='border-1 border-gray-900 mt-1' />
          {selectedBranch && (
            <div key={selectedBranch.id}>
              <div>
                <div className="flex justify-between p-1 mt-1">
                  <p className='text-gray-900 font-medium text-base'>
                    Branch Name: {selectedBranch.branchName}
                  </p>
                  <div className='edit-btn'>
                    <FaEdit
                      size={18}
                      className="text-gray-600 cursor-pointer"
                      onClick={handleEditBranchModalOpen}
                    />
                  </div>
                </div>
                <div className="p-1">
                  <div className='flex'>
                    <p className="text-gray-600 font-semibold text-sm">Phone: </p>
                    <p className="font-normal text-sm text-gray-600 ml-2">
                      {selectedBranch.branchPhoneNum}
                    </p>
                  </div>
                  <div className='flex'>
                    <p className="text-gray-600 font-semibold text-sm">Email: </p>
                    <p className="font-normal text-sm text-gray-600 ml-2">
                      {selectedBranch.branchEmail}
                    </p>
                  </div>
                  <div className='flex'>
                    <p className="text-gray-600 font-semibold text-sm">Country: </p>
                    <p className="font-normal text-sm text-gray-600 ml-2">
                      {selectedBranch.branchCountry}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mt-1 font-semibold text-sm underline">Address</p>
                    <p className="font-normal mt-1 text-sm text-gray-600">
                      {selectedBranch.branchAddress1}
                    </p>
                    <p className="font-normal mt-1 text-sm text-gray-600">
                      {selectedBranch.branchAddress2}
                    </p>
                    <p className="font-normal mt-1 text-sm text-gray-600">
                      {selectedBranch.branchPostcode}, {selectedBranch.branchCity}, {selectedBranch.branchState}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-2 p-2 border border-gray-900 rounded-xl">
                <p className="text-base p-1 font-semibold tracking-tight text-gray-900 flex justify-between">
                  Site Info
                  <FaPlus
                    size={14}
                    className="text-gray-900 cursor-pointer mt-1"
                    onClick={() => handleAddSiteModalOpen(selectedBranch)}
                  />
                </p>
                <hr className='border-1 border-gray-900 mt-1' />
                {selectedBranch.site && selectedBranch.site.length > 0 ? (
                  selectedBranch.site.map((site,index) => (
                    <div key={site.id} className="mb-1">
                      <div className="flex justify-between p-1">
                        <div className="flex flex-wrap p-1 gap-2 lg:gap-8">
                          <div>
                            <p className="font-bold text-gray-900 text-base underline">Site {index + 1} </p>
                            <div className='flex'>
                              <p className="text-gray-600 font-semibold text-sm">Phone: </p>
                              <p className="font-normal text-sm text-gray-600 ml-2">
                                {site.sitePhone}
                              </p>
                            </div>
                            <div className='flex'>
                              <p className="text-gray-600 font-semibold text-sm">Email: </p>
                              <p className="font-normal text-sm text-gray-600 ml-2">
                                {site.siteEmail}
                              </p>
                            </div>
                            <div className='flex'>
                              <p className="text-gray-600 font-semibold text-sm">Country: </p>
                              <p className="font-normal text-sm text-gray-600 ml-2">
                                {site.siteCountry}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-600 mt-1 font-bold text-sm underline ">Address</p>
                            <p className="font-normal text-sm text-gray-600">
                              {site.siteAddress1}
                            </p>
                            <p className="font-normal text-sm text-gray-600">
                              {site.siteAddress2}
                            </p>
                            <p className="font-normal text-sm text-gray-600">
                              {site.sitePostcode}, {site.siteCity}, {site.siteState}
                            </p>
                          </div>
                        </div>
                        <div className='edit-btn'>
                          <FaEdit
                            size={16}
                            className="text-gray-600 cursor-pointer mt-2"
                            onClick={() => handleEditSiteModalOpen(site)}
                          />
                        </div>
                      </div>
                      <hr className="border-1 border-gray-800 mt-1" />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm mt-2">No sites associated with this branch.</p>
                )}
              </div>
            </div>
          )}
          {branches.length === 0 && <p className="text-gray-500 text-sm text-center mt-2">No branch...</p>}

          {/* Pagination Controls */}
          <nav aria-label="Page navigation example" className="mt-6">
            <div className='flex justify-end'>
              <ul className="inline-flex -space-x-px text-sm">
                <li>
                  <a
                    href="#"
                    onClick={() => paginate(currentPage - 1)}
                    className={`flex items-center justify-center px-4 h-12 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage === 1 ? 'cursor-not-allowed' : ''}`}
                  >
                    Previous
                  </a>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index + 1}>
                    <a
                      href="#"
                      onClick={() => paginate(index + 1)}
                      aria-current={currentPage === index + 1 ? "page" : undefined}
                      className={`flex items-center justify-center px-4 h-12 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${currentPage === index + 1 ? 'text-blue-600 border-blue-300 bg-blue-50' : ''}`}
                    >
                      {index + 1}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#"
                    onClick={() => paginate(currentPage + 1)}
                    className={`flex items-center justify-center px-4 h-12 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage === totalPages ? 'cursor-not-allowed' : ''}`}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      {/* Add Branch Modal */}
      <Modal
        isOpen={isAddBranchModalOpen}
        onClose={() => setIsAddBranchModalOpen(false)}
        title="Add Branch"
      >
        <AddBranchModal closeModal={() => setIsAddBranchModalOpen(false)} companyID={companyID} />
      </Modal>

      {/* Edit Branch Modal */}
      <Modal
        isOpen={isEditBranchModalOpen}
        onClose={() => setIsEditBranchModalOpen(false)}
        title="Edit Branch"
      >
        {selectedBranch && (
          <EditBranchModal
            closeModal={() => setIsEditBranchModalOpen(false)}
            branch={selectedBranch}
            companyID={companyID}
          />
        )}
      </Modal>

      {/* Add Site Modal */}
      <Modal
        isOpen={isAddSiteModalOpen}
        onClose={() => setIsAddSiteModalOpen(false)}
        title="Add Site"
      >
        {selectedBranch && (
          <AddSiteModal
            closeModal={() => setIsAddSiteModalOpen(false)}
            branch={selectedBranch}
          />
        )}
      </Modal>

      {/* Edit Site Modal */}
      <Modal
        isOpen={isEditSiteModalOpen}
        onClose={() => setIsEditSiteModalOpen(false)}
        title="Edit Site"
      >
        {selectedSite && (
          <EditSiteModal
            closeModal={() => setIsEditSiteModalOpen(false)}
            site={selectedSite}
          />
        )}
      </Modal>
    </DefaultLayout>
  );
}
