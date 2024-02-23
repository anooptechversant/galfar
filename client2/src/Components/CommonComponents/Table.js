import React from 'react'
import { useState, useEffect } from "react";
import Loading from "../../assets/Images/Loading_icon.gif";
import Status from "./Status";
import Pagination from "react-bootstrap/Pagination";
import "../CommonComponents/table.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Tooltip } from 'react-tooltip'
import AccordionComp from './AccordionComp';
import GeneralPopup from './GeneralPopup';
import { current } from '@reduxjs/toolkit';
import { useNavigate } from "react-router-dom";

function Table(props) {
  const itemsPerPage = 8;
  const [tableData, setTableData] = useState(props.Data);
  const [totalPages, setTotalPages] = useState(Math.ceil(10/ itemsPerPage));
  const propLoading = props.propLoading
  const propResponseMessage =  props.propResponseMessage
  const propHandleAdd = props.propHandleAdd
  const propStatusData = props.propStatusData
  const propHandleDelete = props.propHandleDelete
  const propDeleteMessage = props.propDeleteMessage
  const propAdminprivilage = props.propAdminprivilage
  const propHandleEdit = props.propHandleEdit
  const [sortActive, setSortActive] = useState("up");
  const [currentData, setCurrentData] = useState("");
  const loading = propLoading;
  const [currentPage, setCurrentPage] = useState(1);
  const maxPaginationPages = 3;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = (id) => {
    setItemToDelete(id);
    handleShow();
  };
  const confirmDelete = () => {
    propHandleDelete(itemToDelete);
    setTableData(tableData.filter((obj) => obj.id !== itemToDelete));
    handleClose();
  };

  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setSelectedRowData(null);
    setShowPopup(false);
  };

  useEffect(() => {
    setTableData(props.Data);
  }, [props.Data]);
  useEffect(() => {
    if(tableData !== undefined && (tableData.length > 0)){
      setCurrentData(tableData.slice(startIndex, endIndex));
    }
  }, [tableData, startIndex, endIndex])

  const handleFirstPage = () => {
    setCurrentPage(1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleSort = (sort, key) => {
    if (sort == "up") {
      const sortedData = [...props.Data].sort((a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      });
      setTableData(sortedData);
      setSortActive("up");
    } else {
      const sortedData = [...props.Data].sort((a, b) => {
        if (a[key] > b[key]) return -1;
        if (a[key] < b[key]) return 1;
        return 0;
      });
      setTableData(sortedData);
      setSortActive("down");
    }
  };
  const handleEdit =(id)=> {
    propHandleEdit(id);
  }

  const handleImageView = (url,id) => {
    navigate(`/${url}/${id}`);
  }
    // Calculate the start and end page numbers to display
  useEffect(() => {
      setTotalPages(Math.ceil(10 / itemsPerPage));
  }, [tableData, itemsPerPage]);
  let startPage = Math.max(1, currentPage - Math.floor(maxPaginationPages / 2));
  let endPage = Math.min(startPage + maxPaginationPages - 1, totalPages);
  const [show, setShow] = useState(false);
  const [imageShow, setImageShow] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const pageRange = Array.from({ length: endPage - startPage + 1 }).map(
    (_, i) => startPage + i
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const filteredHeaders = props.columns.filter((header) => header.key !== "id");
  const tableHeaders = filteredHeaders.map((header) => (
    <th key={header.key} scope='col'>
      <span>
        <div
          className={`up-arrow ${sortActive == "up" ? "active-className" : ""}`}
          onClick={() => handleSort("up", header.key)}
        ></div>
        <div
          className={`down-arrow ${
            sortActive == "down" ? "active-className" : ""
          }`}
          onClick={() => handleSort("down", header.key)}
        ></div>
      </span>
      {header.name}
    </th>
  ));
  return (
    <div className='card shadow mb-4'>
      {loading ? (
        <div className='spinner'>
          <img className='spinner-icon' src={Loading} />
        </div>
      ) : null}
      <div className='card-header py-3'>
        <div className='row'>
          <div className='col-md-6'>
            <h6 className='m-0 font-weight-bold text-primary'>
              {props.propPageTitle}
            </h6>
          </div>
          <div className='col-md-3'>
            {propAdminprivilage ?
              <span className='add-sec'>
                <span className='add-label'>{props.propAddPageTitle}</span>
                  <span
                    className='btn btn-primary btn-circle btn-sm'
                    onClick={() => {
                      propHandleAdd();
                    }}
                  >
                    <i className='fas fa-add add-icon'></i>
                  </span>
                </span>
              : ""
            }
          </div>
          <Status
            propResponseMessage={propResponseMessage}
            propActionType={"success"}
            propStatusData={propStatusData}
          />
        </div>
      </div>
      <div className='card-body'>
        <div className='table-responsive'>
          <table className='table'>
            <thead>
              <tr>
                <th key='id' scope='col'>
                  <span>
                    <div
                      className='up-arrow'
                      onClick={() => handleSort("up", "id")}
                    ></div>
                    <div
                      className='down-arrow'
                      onClick={() => handleSort("down", "id")}
                    ></div>
                  </span>
                  ID
                </th>
                {tableHeaders}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData && !loading ? (
                currentData.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td>{index + 1}</td>
                      {props.columns.map((header) =>
                        header.key !== "id" ? (
                          <td className='tableBody' scope='row'>
                            {item[header.key]}
                          </td>
                        ) : null
                      )}
                      <td className='tableBody'>
                        <span
                          className={`btn btn-info btn-circle btn-sm ${propAdminprivilage ? '' : 'disabled'}`}
                          onClick={() => propAdminprivilage ? handleEdit(item.id) : null}
                        >
                          <i className='fas fa-edit edit-icon' data-tooltip-id="tooltipEdit" data-tooltip-content="you don't have permission to modify"></i>
                        </span>
                        {propAdminprivilage ? ""
                        :<Tooltip id="tooltipEdit" />}
                        <span
                          className={`btn btn-danger btn-circle btn-sm delete ${propAdminprivilage ? '' : 'disabled'}`}
                          onClick={() => propAdminprivilage ? handleDelete(item.id) : null}
                        >
                          <i className='fas fa-trash' data-tooltip-id="tooltipDelete" data-tooltip-content="you don't have permission to delete"></i>
                          {propAdminprivilage ? ""
                        :<Tooltip id="tooltipDelete" />}
                        </span>
                        {props.propImageContent ?
                          <span
                            className={`btn btn-warning btn-circle btn-sm ${propAdminprivilage ? '' : 'disabled'}`}
                            onClick={() => propAdminprivilage ? handleImageView(props.propEditImageUrl,item.latestVersionPrimaryID) : null}
                          >
                            <i className='fas fa-eye edit-icon' data-tooltip-id="tooltipView" data-tooltip-content="View more details"></i>
                            <Tooltip id="tooltipView" />
                          </span>
                        :""}
                      </td>
                    </tr>
                    {showPopup && (
                      <GeneralPopup
                        data={item.images} 
                        onClose={handleClosePopup}
                      />
                    )}
                  </React.Fragment>
                ))
                ) : (
                    <tr>
                      <td colSpan='2'>No data available</td>
                    </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className='d-flex justify-content-center card-header p-3'>
        <Pagination size='sm'>
          <Pagination.First onClick={handleFirstPage} />
          <Pagination.Prev onClick={handlePrevPage} />
          {startPage > 1 && (
            <Pagination.Ellipsis
              onClick={() => setCurrentPage(startPage - 1)}
            />
          )}
          {pageRange.map((page) => (
            <Pagination.Item
              key={page}
              active={currentPage === page}
              onClick={() => handlePageChange(page)}
              activeLabel = ""
            >
              {page}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>{propDeleteMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='danger' onClick={confirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal> 
    </div>
  )
}

export default Table