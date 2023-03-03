import React, { useReducer } from "react";

const defaultValue = {
  title: "",
  description: "",
  date: "",
};
const formReducer = (state, actions) => {
  if (actions.type === "title") {
    const updateTitle = actions.title;
    return { ...state, title: updateTitle };
  }
  if (actions.type === "description") {
    const updateDescription = actions.description;
    return { ...state, description: updateDescription };
  }
  if (actions.type === "date") {
    const updateDate = actions.date;
    return { ...state, date: updateDate };
  }
  if (actions.type === "remove") {
    return { title: "", description: "", date: "" };
  } else {
    return defaultValue;
  }
};
const Form = (props) => {
  const [formData, dispatchFormData] = useReducer(formReducer, defaultValue);

  const titleHandler = (event) => {
    dispatchFormData({ type: "title", title: event.target.value });
  };

  const descriptionHandler = (event) => {
    dispatchFormData({ type: "description", description: event.target.value });
  };
  const dateHandler = (event) => {
    dispatchFormData({ type: "date", date: event.target.value });
  };
  const formDataNullHandler = () => {
    dispatchFormData({ type: "remove" });
  };

  const FormHandler = (event) => {
    event.preventDefault();
    const data = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
    };

    formDataNullHandler();
    props.postFormData(data);
  };
  return (
    <form
      onSubmit={FormHandler}
      className="bg-white rounded-sm bg-opacity-20 backdrop-blur w-full max-w-sm p-4 flex flex-col gap-4"
    >
      <h1 className="font-bold text-xl uppercase text-center">Add Movies</h1>
      <div className="form-control flex flex-col gap-1">
        <label htmlFor="title font-bold text-sm">Title</label>
        <input
          className="focus:outline-none p-2"
          value={formData.title}
          type="text"
          name="title"
          id="title"
          onChange={titleHandler}
        />
      </div>
      <div className="form-control  flex flex-col gap-1">
        <label htmlFor="description font-bold text-sm">Description</label>
        <input
          value={formData.description}
          className="focus:outline-none p-2"
          onChange={descriptionHandler}
          type="text"
          name="description"
          id="description"
        />
      </div>
      <div className="form-control  flex flex-col gap-1">
        <label htmlFor="releasedate font-bold text-sm">Release Date</label>
        <input
          className="focus:outline-none p-2"
          value={formData.date}
          onChange={dateHandler}
          type="date"
          name="releasedate"
          id="releasedate"
        />
      </div>
      <button className="bg-black text-white py-2 px-4 mt-2">Add Movie</button>
    </form>
  );
};

export default Form;
