import React, { useEffect, useState } from "react";
import AuthHandler from "../utils/Authhandler";
import APIHandler from "../utils/APIHandler";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import TruncateText from "../utils/TruncateText";
import Pagination from "../utils/Pagination";
import usePagination from "../Hooks/usePagination";

const Company = () => {
  const apiHandler = APIHandler();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    license_no: "",
    address: "",
    contact_no: "",
    email: "",
    description: "",
  });

  const [companyData, setCompanyData] = useState([]);

  const fetchCompanyData = async () => {
    try {
      const companydata = await apiHandler.fetchAllCompany();
      console.log("Fetched company data:", companydata); // Debugging log
      setCompanyData(companydata.data.data); // Ensure this matches the structure of your data
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

//  ---------------------- View company Details ---------------------- //

  const viewCompanyDetails = (company_id) => {
    console.log("Viewing company details for company ID:", company_id);
    // Redirect to the company details page
    setCompanyData(companyData);
    navigate(`/companydetails/${company_id}`);
  };

  useEffect(() => {
    AuthHandler.checkTokenExpiry();
    fetchCompanyData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiHandler.saveCompanyData(
        formData.name,
        formData.license_no,
        formData.address,
        formData.contact_no,
        formData.email,
        formData.description
      );
      console.log("Company data saved:", response.data);
      toast.success(response.data.message);
      // Reset form fields
      setFormData({
        name: "",
        license_no: "",
        address: "",
        contact_no: "",
        email: "",
        description: "",
      });
      // Fetch updated company data
      fetchCompanyData();
    } catch (error) {
      console.error("Error saving company data:", error);
      toast.error("Error saving company data");
    }
  };
  /* Filter the company data based on the search query*/
  const filteredCompanyData = companyData.filter((company) =>
    searchQuery === ""
      ? true
      : company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.license_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.contact_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsPerPage = 2;
  const {
    currentPage,
    currentData: currentCompanyData,
    totalPages,
    handlePageChange,
  } = usePagination(filteredCompanyData, itemsPerPage);

  return (
    <div className="container-fluid p-0">
      <div className="row mb-2 mb-xl-3">
        <h3 className="mb-3">
          <strong>Company</strong> Details
        </h3>
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Add Company Bank </h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Enter Company Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="license_no">
                      License Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="license_no"
                      name="license_no"
                      placeholder="Enter License No."
                      value={formData.license_no}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="address">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      placeholder="1234 Main St"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="contact_no">
                      Contact Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="contact_no"
                      name="contact_no"
                      placeholder="Enter Contact No."
                      value={formData.contact_no}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter Company Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="description">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      placeholder="Enter Company Description"
                      rows="1"
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Company
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-12 mt-4">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Company List</h3>
            </div>
            <div className="m-2">
              <div className="row">
                <div className="col-sm-12 ml-2">
                  <input
                    type="search"
                    className="form-control form-control-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search companies..."
                  />
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      {/* <th>ID</th> */}
                      <th>Name</th>
                      <th>License No.</th>
                      <th>Address</th>
                      <th>Contact No.</th>
                      <th>Email</th>
                      <th>Description</th>
                      <th>Added On</th>
                      <th>Actions</th>
                    </tr>
                  </thead> 
                  <tbody>
                    {currentCompanyData.length > 0 ? (
                      currentCompanyData.map((company, index) => (
                        <tr key={index}>
                          {/* <td>{company.id}</td> */}
                          <td>{company.name}</td>
                          <td>{company.license_no}</td>
                          <td>{company.address}</td>
                          <td>{company.contact_no}</td>
                          <td>{company.email}</td>
                          <td>
                            <TruncateText
                              text={company.description}
                              maxLength={5}
                            />
                          </td>
                          <td>{new Date(company.added_on).toLocaleString()}</td>
                          <td>
                            <button
                              className="btn btn-outline-info"
                              onClick={() => viewCompanyDetails(company.id)}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">
                          No companies found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;
