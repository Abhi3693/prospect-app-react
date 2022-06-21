import { useState, useEffect } from 'react';
import { ImCross } from 'react-icons/im';

import ROOT_URL from "../utils/constants";
import * as yup from 'yup';
import useFetch from '../customHooks/useFetch';

let schema = yup.object().shape({
  name: yup
    .string()
    .required("Prospect Name required")
    .min(3, 'Name should be of 3 charachter'), 
  demography: yup
    .string()
    .required("Demography required")
    .min(3, 'Demography should be of 3 charachter'),
  source: yup
    .string()
    .required("Source required")
    .min(3, 'Source should be of 3 charachter'),
  addedBy: yup
    .string()
    .required("AddedBy required")
    .min(3, 'Added by should be of 3 charachter'),
  setType: yup
    .string()
    .required('Type is required'),
  teamMemberCount: yup
    .number()
    .required('Team member count is required'),
  details: yup
    .string()
});

const INITIAL_FORM_DATA = {
  name: "",
  demography: "",
  source: "",
  addedBy: "",
  setType: "",
  teamMemberCount: "",
  details: "",
}

const INITIAL_FORM_ERROR = {
  name: "",
  demography: "",
  source: "",
  addedBy: "",
  setType: "",
  teamMemberCount: "",
}

function AddProspect(props) {
  let [formData, setFormData] = useState(INITIAL_FORM_DATA);
  let [isValidating, setValidating] = useState(false);
  let [formError, setFormErrors] = useState(INITIAL_FORM_ERROR);

  useEffect(() => {
    if (isValidating) performValidation();
  }, [formData]);

  let { makeApiCall } = useFetch();

  const handleAddProspect = async (url, method, body) => {
    let response = await makeApiCall(url, method, body);
    if (response.errors) {
      setFormErrors(response.errors);
    } else {
      props.setAddProspect(false);
    }
  }

  const handleChange = (event) => {
    let {name, value} = event.target;
    setFormData({...formData, [name]: value})
  }

  // Validation
  const resetValidationErrors = () => {
    setFormErrors({});
  };

  const performValidation = (successCallback = null) => {
    schema
      .validate(formData, { abortEarly: false })
      .then((values) => {
        resetValidationErrors();
        if (successCallback) {
          successCallback(values);
        }
      })
      .catch((err) => {
        const errors = {};
        err.inner.forEach((e) => {
          if (!errors[e.path]) {
            errors[e.path] = e.errors[0];
          }
        });
        setFormErrors(errors);
      });
  };

  const validateForm = (event) => {
    event.preventDefault();
    setValidating(true);
    performValidation(handleSubmit);
  };

  const handleSubmit = (values) => {
    handleAddProspect(
      ROOT_URL,
      'POST',
      JSON.stringify({ prospect: values})
    );
    setValidating(false);
    setFormData(INITIAL_FORM_DATA);
  };

  const handleCross = () => {
    props.setAddProspect(false);
    setFormErrors(INITIAL_FORM_ERROR);
  }

  return (
      <div className="form-container">
        <span className="cross-holder" onClick={handleCross}><ImCross className="cross" /></span>
        <form onSubmit={validateForm}>
          <h2>Add Prospect Set</h2>
          <input 
            className="form-input"
            name="name" 
            type="text" 
            placeholder="Name Prospect Set" 
            value={formData.name} 
            onChange={handleChange}
          />
          <p className='my-2 text-danger'>{formError.name}</p>
          <input 
            className="form-input"
            name="demography" 
            type="text" 
            placeholder="Add Demography" 
            value={formData.demography} 
            onChange={handleChange}
          />
          <p className='my-2 text-danger'>{formError.demography}</p>
          <input 
            className="form-input"
            name="source" 
            type="text" 
            placeholder="Add source" 
            value={formData.source} 
            onChange={handleChange}
          />
          <p className='my-2 text-danger'>{formError.source}</p>
          <input 
            className="form-input"
            name="addedBy" 
            type="text" 
            placeholder="Add addedBy" 
            value={formData.addedBy} 
            onChange={handleChange}
          />
          <p className='my-2 text-danger'>{formError.addedBy}</p>
          <input 
            className="form-input"
            name="setType" 
            type="text" 
            placeholder="Add setType" 
            value={formData.setType} 
            onChange={handleChange}
          />
          <p className='my-2 text-danger'>{formError.setType}</p>
          <input 
            className="form-input"
            name="teamMemberCount" 
            type="text" 
            placeholder="Add teamMemberCount" 
            value={formData.teamMemberCount} 
            onChange={handleChange}
          />
          <p className='my-2 text-danger'>{formError.teamMemberCount}</p>
          <input 
            className="form-input"
            name="details" 
            type="text" 
            placeholder="Add details" 
            value={formData.details} 
            onChange={handleChange}
          />
          <input type="submit" className="btn btn-secondary mt-4" value="Add Prospect Set" />
        </form>
      </div>
  )
}

export default AddProspect;