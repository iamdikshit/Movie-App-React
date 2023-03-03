import React, { useCallback, useEffect, useState } from "react";
import hero3 from "../../assets/img/hero3.jpg";
import Card from "../Card/Card";
import Form from "../UI/Form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../UI/Loader";
import NoDataFound from "../UI/NoDataFound";
const Hero = () => {
  const [movies, setMovies] = useState([]);
  const [isAddedMovie, setIsAddedMovie] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // Get data from firebase movie api
  const getMovies = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios({
        method: "GET",
        url: "https://movieapp-cc9e5-default-rtdb.firebaseio.com/movies.json",
      });
      let result = [];
      if (res.status === 200) {
        setIsLoading(false);
        console.log(res.data);
        for (const key in res.data) {
          result.push({
            id: key,
            title: res.data[key].title,
            description: res.data[key].description,
            date: res.data[key].date,
          });
        }
        console.log(result);

        setMovies(() => {
          return result;
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (isAddedMovie) {
      getMovies();
      setIsAddedMovie(false);
    }
  }, [getMovies, isAddedMovie]);

  const alerts = (msg, type = true) => {
    const options = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    };
    if (type) {
      toast.success(msg, options);
    } else {
      toast.error(msg, options);
    }
  };

  const postFormData = async (data) => {
    // console.log(data);
    try {
      const res = await axios({
        method: "POST",
        url: "https://movieapp-cc9e5-default-rtdb.firebaseio.com/movies.json",
        data: data,
      });
      if (res.status === 200) {
        setIsAddedMovie(true);
        alerts("Data Added Successfully");
      }
    } catch (err) {
      console.log(err.message);
      alerts(err.message, false);
    }
  };
  return (
    <div className="w-full h-screen relative">
      <img
        className="fixed w-full h-screen object-cover -z-10"
        src={hero3}
        alt="bg"
      />
      <div className="w-full h-screen pt-20 grid grid-cols-1 md:grid-cols-2  gap-8  px-8 md:px-16  ">
        <div className="container mx-auto flex justify-center items-center mt-10 md:mt-0 ">
          <Form postFormData={postFormData} />
        </div>
        <div className="movie-section  ">
          {isLoading && <Loader />}
          <div className="mt-24 flex flex-col gap-1 overflow-y-scroll">
            {!isLoading &&
              movies.length !== 0 &&
              movies.map((movie) => (
                <Card
                  key={movie.id}
                  name={movie.title}
                  description={movie.description}
                  date={movie.date}
                />
              ))}
          </div>

          {!isLoading && movies.length === 0 && <NoDataFound />}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Hero;
