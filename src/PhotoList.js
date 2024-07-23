// src/components/PhotoList.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { TailSpin } from "react-loader-spinner";

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=20`
      );
      const newPhotos = response.data;

      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);

      if (newPhotos.length === 0 || newPhotos.length < 20) {
        setHasMore(false);
      }

      setPage(page + 1);
    } catch (err) {
      setError("Failed to load photos. Please try again later.");
    }
  };

  if (error) {
    return <div style={{ textAlign: "center", color: "red" }}>{error}</div>;
  }

  return (
    <div>
      <h1>Photo Gallery</h1>
      <InfiniteScroll
        dataLength={photos.length}
        next={fetchPhotos}
        hasMore={hasMore}
        loader={
          <TailSpin
            height="50"
            width="50"
            color="#3498db"
            ariaLabel="loading"
          />
        }
        endMessage={
          <p style={{ textAlign: "center" }}>You have seen all the photos!</p>
        }
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {photos.map((photo) => (
            <div
              key={photo.id}
              style={{
                margin: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                width: "200px",
                textAlign: "center",
              }}
            >
              <img
                src={photo.thumbnailUrl}
                alt={photo.title}
                style={{ width: "100%", height: "auto", borderRadius: "4px" }}
              />
              <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                {photo.title}
              </p>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default PhotoList;
