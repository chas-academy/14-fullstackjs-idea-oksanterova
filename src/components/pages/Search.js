import React, { useState, useRef, useEffect, Fragment } from "react";
import "../../App.css";
import styled from "styled-components/macro";
import { gql } from "apollo-boost";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { QueryLoader } from "../Loader";
import Flex from "styled-flex-component";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow
} from "@react-google-maps/api";
import { Name } from "../Common";

const QUERY = gql`
  query Search($term: String!) {
    search(term: $term, location: "nacka") {
      business {
        id
        photos
        name
        coordinates {
          latitude
          longitude
        }
        categories {
          title
        }
        rating
        location {
          formatted_address
        }
      }
    }
  }
`;

export const SearchWrapper = styled.div`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border: 1px #ccc solid;
  background-color: #fff;
  border-radius: 6px 0 0 6px;
  position: fixed;
  overflow-y: scroll;
  bottom: 20px;
  right: calc(100%-455px);
  left: 20px;
  top: 82px;
  z-index: 99999;

  @media (max-width: 700px) {
    top: 120px;
    min-width: 360px;
    border-radius: 6px;
    right: 20px;
    padding-right: 20px;
  }
  @media (max-width: 460px) {
    padding-right: 0;
    min-width: 320px;
  }

  @media (max-width: 400px) {
    top: 120px;
    min-width: 280px;
  }

  @media (max-width: 340px) {
    min-width: 240px;
  }
`;

export const Image = styled.img`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border: 1px #ccc solid;
  border-radius: 4px;
  cursor: pointer;
  width: 100px;
  height: 100px;
  margin-right: 20px;
  object-fit: cover;
`;

export const SearchResult = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  border-bottom: 1px solid #c7cdcf;
  width: 400px;
  padding: 20px;
  &:hover {
    background-color: #eeeeee;
  }

  @media (max-width: 700px) {
    width: 340px;
  }

  @media (max-width: 480px) {
    width: 300px;
  }

  @media (max-width: 420px) {
    width: 290px;
  }

  @media (max-width: 340px) {
    width: 240px;
  }
`;

export const Summary = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  flex: 1;

  @media (max-width: 340px) {
    min-width: 160px;
  }
`;

export const NoResult = styled.div`
  margin: 20px;
`;

export const Category = styled.div`
  font-size: 14px;
  color: #83142c;
  margin-right: 20px;
`;

export const Info = styled.div`
  font-weight: 400;
  font-size: 14px;
`;

export const Rating = styled.div`
  display: flex;
  flex-flow: row wrap;
  font-weight: 700;
  line-height: 24px;
  align-self: flex-end;
`;

export const Star = styled.div`
  height: 24px;
  width: 24px;
  margin-left: 5px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAyVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACqPCdOAAAAQnRSTlMAAQMFBggMDQ4SFRYYGRscHR8iJSgrMTg6QEJERUZHTVRXWWFobHt8goiMjpSeoKW0tby+wMXR4uTo6e3z9ff5+/1ic5NlAAAArElEQVQYGX3Bh1bCMAAF0BekRaYgQ2TKEgoIyBCUYXn//1G01SaB5nAvFLFMwKjFCUzEN/kIgzpJB1FiR4+NiBp9I9wSWwZsSPF0peNsXP77mvZechaAFU32MZTPNOgCKLmMeIPv+Zc32viTP/FKE6HsgZpXKH0qS2hmVI7Q/FBjQXqgrgApw8DCpa8BqUrPPAVrSM87pAH5+QSfPSHXkMabIkLJjx0kAZ3AXRcCMT2AxiE/LgAAAABJRU5ErkJggg==)
    no-repeat center;
`;

const GoogleMapWrapper = styled.div`
  bottom: 20px;
  left: 455px;
  right: 20px;
  top: 82px;
  z-index: 1;
  border-radius: 0 6px 6px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border: 1px #ccc solid;
  position: fixed;
  overflow: hidden;

  @media (max-width: 700px) {
    display: none;
  }
`;

function BusinessMarker({ business, isActive, mapRef }) {
  const { id, name, coordinates } = business;
  const defaultIcon =
    "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569";
  const activeIcon =
    "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|00dddd";

  const icon = isActive ? activeIcon : defaultIcon;
  const position = {
    lat: coordinates.latitude,
    lng: coordinates.longitude
  };

  const markerRef = useRef(null);
  const infoWindowRef = useRef(null);

  const closeInfoWindow = () => {
    const infoWindow = infoWindowRef.current;

    if (!infoWindow) {
      return;
    }

    infoWindow.close();
  };

  const openInfoWindow = () => {
    const infoWindow = infoWindowRef.current;
    const map = mapRef.current;
    const marker = markerRef.current;

    if (!infoWindow || !map || !marker) {
      return;
    }

    infoWindow.open(map, marker);
  };

  useEffect(() => {
    if (isActive) {
      openInfoWindow();
    } else {
      closeInfoWindow();
    }
  }, [isActive]);

  const infoWindow = (
    <InfoWindow
      onLoad={ref => {
        infoWindowRef.current = ref;
        closeInfoWindow();
      }}
      position={position}
    >
      <h3>{name}</h3>
    </InfoWindow>
  );

  const marker = (
    <Marker
      onLoad={ref => {
        markerRef.current = ref;
      }}
      onClick={e => {
        openInfoWindow();
      }}
      key={id}
      icon={icon}
      position={position}
    />
  );

  return (
    <Fragment>
      {marker}
      {infoWindow}
    </Fragment>
  );
}

function SearchMap({ business, activeId }) {
  const fitBounds = map => {
    const bounds = new window.google.maps.LatLngBounds();

    business.forEach(({ coordinates }) => {
      bounds.extend({ lat: coordinates.latitude, lng: coordinates.longitude });
    });

    map.fitBounds(bounds);
  };

  const mapRef = useRef(null);

  const markers = business.map(el => (
    <BusinessMarker
      key={el.id}
      isActive={el.id === activeId}
      business={el}
      mapRef={mapRef}
    />
  ));

  return (
    <LoadScript
      id="script-loader"
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
    >
      <GoogleMapWrapper>
        <GoogleMap
          id="example-map"
          mapContainerStyle={{ height: "100vh" }}
          onLoad={map => {
            fitBounds(map);
            mapRef.current = map;
          }}
          options={{
            disableDefaultUI: true
          }}
        >
          {markers}
        </GoogleMap>
      </GoogleMapWrapper>
    </LoadScript>
  );
}

function SearchResults({ business }) {
  const [activeId, setActiveId] = useState(null);

  const searchResults = business.map(
    ({ id, photos, name, categories, rating, location }) => (
      <SearchResult key={id} onMouseEnter={e => setActiveId(id)}>
        <Link to={`/business/${id}`}>
          <Image src={photos} />
        </Link>
        <Summary>
          <Link to={`/business/${id}`}>
            <Name>{name}</Name>
          </Link>

          {categories.length > 0 ? (
            <Category>{categories[0].title}</Category>
          ) : (
            <Category>Other</Category>
          )}

          {location.formatted_address.split("\n").map((address, index) => (
            <Info key={index}>{address}</Info>
          ))}
        </Summary>
        <Rating>
          <span>{rating}</span>
          <Star />
        </Rating>
      </SearchResult>
    )
  );

  if (searchResults.length === 0)
    return (
      <SearchWrapper>
        <NoResult>There is not any match. Please try again!</NoResult>
      </SearchWrapper>
    );

  return (
    <Flex>
      <SearchWrapper>
        {searchResults}
        <SearchMap business={business} activeId={activeId} />
      </SearchWrapper>
    </Flex>
  );
}

function Search({ location }) {
  const term = queryString.parse(location.search).q;

  return (
    <QueryLoader query={QUERY} variables={{ term }}>
      {({ search }) => <SearchResults business={search.business} />}
    </QueryLoader>
  );
}

export default withRouter(Search);
