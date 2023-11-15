/**
 * @author wheesunglee
 * @create date 2023-10-20 13:54:31
 * @modify date 2023-10-30 11:21:08
 */

/**
 * @author jeongyearim
 * @create date 2023-09-19 17:22:45
 * @modify date 2023-09-19 17:22:45
 * [현재 위치 위도, 경도 가져와서 서버로 전달]
 */

import { useMemo } from "react";
import { Error } from "../../components/util/Alert";
import TokenRefresher from "../../components/util/TokenRefresher";

const fetchAllProducts = () => {
  return TokenRefresher.get("http://localhost:8080/api/products")
    .then((res) => {
      console.log("fetchAllProducts", res.data);
      return {
        data: res.data,
      };
    })
    .catch((error) => {
      if (error.response) {
        const errorResponse = error.response.data;
        console.log(errorResponse);
      }
    });
};

const fetchProduct = (id) => {
  return TokenRefresher.get(`http://localhost:8080/api/products/${id}`)
    .then((res) => {
      console.log("fetchproduct", res.data);
      return {
        data: res.data,
        images: res.data.images,
      };
    })
    .catch((error) => {
      if (error.response) {
        const errorResponse = error.response.data;
        console.log(errorResponse);
      }
    });
};
const fetchLiked = (id) => {
  return TokenRefresher.get(`http://localhost:8080/api/redis/checkLiked/${id}`)
    .then((res) => {
      console.log("fetchliked", res.data);
      return { data: res.data };
    })
    .catch((error) => {
      if (error.response) {
        const errorResponse = error.response.data;
        console.log(errorResponse);
      }
    });
};

const fetchLikes = (id) => {
  return TokenRefresher.get(`http://localhost:8080/api/redis/getLikes/${id}`)
    .then((res) => {
      console.log("fetchlikes", res.data);
      return { data: res.data };
    })
    .catch((error) => {
      if (error.response) {
        const errorResponse = error.response.data;
        console.log(errorResponse);
      }
    });
};

const changeLikes = (id) => {
  return TokenRefresher.put(`http://localhost:8080/api/redis/changeLikes/${id}`)
    .then((res) => {
      console.log("fetchlikes", res.data);
      return { data: res.data };
    })
    .catch((error) => {
      if (error.response) {
        const errorResponse = error.response.data;
        console.log(errorResponse);
      }
    });
};

const { kakao } = window;
const getAddress = (lat, lng) => {
  return new Promise((resolve, reject) => {
    const geocoder = new kakao.maps.services.Geocoder();
    const coord = new kakao.maps.LatLng(lat, lng);
    const callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const addressInfo = {
          region1: result[0].address.region_1depth_name,
          region2: result[0].address.region_2depth_name,
          region3: result[0].address.region_3depth_name,
        };
        resolve(addressInfo);
      } else {
        reject(status);
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  });
};
const getNearby = async (viewNearby) => {
  if (viewNearby) {
    console.log("전지역 보기");
    try {
      const response = await fetchAllProducts();
      if (response) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("현지역 보기");
    try {
      const location = await getLocation(); // Wait for getLocation to complete
      const response = await sendCoordinatesToServer(location[0], location[1]); // Pass the latitude and longitude
      return response;
    } catch (error) {
      console.error(error);
    }
  }
};

const sendCoordinatesToServer = async (latitude, longitude) => {
  try {
    const response = await TokenRefresher.get(
      "http://localhost:8080/api/products/nearestProducts",
      {
        params: {
          latitude: latitude,
          longitude: longitude,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const errorResponse = error.response.data;
      console.log(errorResponse);
    }
    throw error;
  }
};

const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error(error);
          reject(error);
        }
      );
    } else {
      const error = new Error("Geolocation is not supported by this browser.");
      console.error(error);
      reject(error);
    }
  });
};

const MapComponent = (latitude, longitude) => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(latitude, longitude),
    level: 3,
    draggable: false,
  };
  const map = new kakao.maps.Map(container, options);
  return useMemo(
    () => (
      <div
        className="myMap"
        style={{
          width: "100%",
          height: "280px",
          position: "relative",
        }}
      ></div>
      // <Map
      //   className="myMap"
      // style={{
      //   width: "100%",
      //   height: "280px",
      //   position: "relative",
      // }}

      // >
      //   <MapMarker position={{ lat: latitude, lng: longitude }}></MapMarker>
      // </Map>
    ),
    [latitude, longitude]
  );
};

export {
  changeLikes,
  fetchAllProducts,
  fetchLiked,
  fetchLikes,
  fetchProduct,
  getAddress,
  getNearby,
};
