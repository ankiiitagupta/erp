import React, { useState } from "react";
import "../stylesheets/CreateNotice.css"; // Make sure to link the CSS file

const CreateNotice = () => {
  const [formData, setFormData] = useState({
    date: "",
    topic: "",
    to: "",
    from: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data: ", formData);
  };

  const handleClear = () => {
    setFormData({
      date: "",
      topic: "",
      to: "",
      from: "",
      content: "",
    });
  };

  return (
    <div className="create-notice-container">
      
      <form className="form-container" onSubmit={handleSubmit}>
      <h1 className="header">Create Notice</h1>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="topic">Topic:</label>
          <input
            type="text"
            id="topic"
            name="topic"
            placeholder="Topic"
            value={formData.topic}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="to">To:</label>
          <select
            id="to"
            name="to"
            value={formData.to}
            onChange={handleChange}
          >
            <option value="">None</option>
            <option value="students">Students</option>
            <option value="faculty">Faculty</option>
            <option value="admins">Admins</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="from">From:</label>
          <input
            type="text"
            id="from"
            name="from"
            placeholder="From"
            value={formData.from}
            onChange={handleChange}
          />
        </div>
        <div className="form-group large">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            placeholder="Content..."
            value={formData.content}
            onChange={handleChange}
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            Submit
          </button>
          <button type="button" className="clear-btn" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNotice;
