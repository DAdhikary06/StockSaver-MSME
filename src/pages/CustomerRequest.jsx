import React from "react";
import { useEffect, useState } from "react";
import AuthHandler from "../utils/Authhandler";
import APIHandler from "../utils/APIHandler";
import { toast } from "react-hot-toast";
import Pagination from "../utils/Pagination";
import usePagination from "../Hooks/usePagination";
// import { useNavigate } from "react-router-dom";

const CustomerRequest = () => {

  const apiHandler = APIHandler();
  // const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    medicine_details: "",
  });

  const [customerRequestList, setCustomerRequestData] = useState([]);

  useEffect(() => {
    AuthHandler.checkTokenExpiry();
    fetchCustomerRequestData();
  }, []);

  const fetchCustomerRequestData = async () => {
    try {
      const customerRequestData = await apiHandler.fetchAllCustomerRequest();
      console.log("Fetched customer request data:", customerRequestData); // Debugging log
      setCustomerRequestData(customerRequestData.data.data); // Ensure this matches the structure of your data
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  // const viewCustomerRequestDetails = (company_id) => {
  //   console.log("Viewing company details for company ID:", company_id);
  //   // Redirect to the company details page
  //   setCompanyData(companyData);
  //   navigate(`/companydetails/${company_id}`);
  // };

  const completeCutomerRequestDetails = async (
    customer_id,
    name,
    phone,
    medicine_details
  ) => {
    try {
      const customerRequestData = await apiHandler.updateCutomerRequest(
        customer_id,
        name,
        phone,
        medicine_details
      );

      console.log(customerRequestData);
      toast.success(customerRequestData.data.message);
      fetchCustomerRequestData();
    } catch (error) {
      console.error(error);
    }
  };

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
      const response = await apiHandler.saveCustomerRequestData(
        formData.name,
        formData.phone,
        formData.medicine_details
      );
      console.log("Cutomer Request saved:", response.data);
      toast.success(response.data.message);
      // Reset form fields
      setFormData({
        name: "",
        phone: "",
        medicine_details: "",
      });
      // Fetch updated customer request data
      fetchCustomerRequestData();
    } catch (error) {
      console.error("Error saving customer request data:", error);
      toast.error("Error saving customer request data");
    }
  };

  const filteredCustReq = customerRequestList.filter((cust) => {
    return searchQuery === ""
      ? cust
      : cust.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cust.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cust.medicine_details.toLowerCase().includes(searchQuery.toLowerCase());
  });


  const itemsPerPage = 5
  const {
    currentPage,
    currentData: currentCustReqData,
    totalPages,
    handlePageChange,
  } = usePagination(filteredCustReq, itemsPerPage);


  return (
    <div className="container-fluid p-0">
      <div className="row mb-2 mb-xl-3">
        <h3 className="mb-3">
          <strong>Manage Customer Medicine</strong> Request
        </h3>
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Add Customer Details</h3>
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
                      placeholder="Enter Customer Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="phone">
                      Phone No.
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      name="phone"
                      placeholder="Enter Phone No."
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-12">
                    <label className="form-label" htmlFor="medicine_details">
                      Medicine Details
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="medicine_details"
                      name="medicine_details"
                      placeholder="Enter Medicine Details"
                      value={formData.medicine_details}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Customer Request
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-12 mt-4">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">All Customer Medicine Details</h3>
            </div>
            <div className="card-body">
            <div className="row mb-2">
                <div className="col-sm-12 ml-2">
                  <input
                    type="search"
                    className="form-control form-control-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search company transactions.."
                  />
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      {/* <th>ID</th> */}
                      <th>Name</th>
                      <th>Phone No.</th>
                      <th>Medicine Details</th>
                      <th>Status</th>
                      <th>Added On</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCustReqData.length > 0 ? (
                    currentCustReqData.map((customer) => (
                      <tr key={customer.id}>
                        {/* <td>{customer.id}</td> */}
                        <td >{customer.customer_name}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.medicine_details}</td>
                        <td
                          className={
                            customer.status == 0
                              ? "text-danger-emphasis"
                              : "text-success"
                          }
                        >
                          {customer.status == 0 ? "Pending" : "Completed"}
                        </td>
                        <td>{new Date(customer.added_on).toLocaleString()}</td>
                        <td>
                          {customer.status == 0 ? (
                            <button
                              className="btn btn-danger"
                              onClick={() =>
                                completeCutomerRequestDetails(
                                  customer.id,
                                  customer.customer_name,
                                  customer.phone,
                                  customer.medicine_details
                                )
                              }
                            >
                              Complete?
                            </button>
                          ) : (
                            <button className="btn btn-success disabled">
                              Completed
                            </button>
                          )}
                        </td>
                      </tr>
                    )))
                    : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No employee data found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
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
  );
};

export default CustomerRequest;
