import React, { useEffect, useState } from "react";
import MediaCard from "./PropertyCard";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";


const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
}));

function InnerComp() {
  const [PropertyName, SetPropertyName] = useState("");
  const [status, setStatus] = useState("");
  const [price, setprice] = useState("");
  const [location, setlocation] = useState("");
  const [allproperties, setAllproperties] = useState([]);
  const [Images, setImages] = useState();

  async function fetchAllPropertyDAta() {
    try {
      const response = await fetch("http://localhost:7000/properties/listing");
      const data = await response.json();
      const result = data.properties;
      setAllproperties(result);
      // setImages(result.property_images);
      //console.log(result);

    //   result.map((item) => {
    //     console.log(item.property_images);
    //   });
 
    } catch (error) {
      console.log("kjnkjsg",error);
    }
  }
 // console.log(allproperties[3]?.property_images); // Check what this outputs

  useEffect(() => {
    fetchAllPropertyDAta();
  },[]);

  
  return (
    <>
      <div>
        {/*       
          <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel> */}
      </div>
      {allproperties?.map((item)=>{
        console.log(item?.property_images,"Mai hu array ")
      })}

      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 4, sm: 3, md: 3}}>
          {allproperties.map((property) => (
            <Grid item xs={6} key={property._id}>
              <Item>
                {/* <MediaCard
               
                //   images={property?.property_images?.map(
                //     (img) => `http://localhost:7000/uploads/${img}`
                //   )} // Pass an array of image URLs
                  images = {property?.property_images}
                  location={property?.property_address}
                  status={property?.status}
                  title={property?.property_name}
                  price={property?.price}
                /> */}
             <MediaCard
                    id={property._id} // Passing the id as a prop
                    images={Array.isArray(property?.property_images) ? property.property_images : []}
                    location={property?.property_address}
                    status={property?.status}
                    title={property?.property_name}
                    price={property?.price}
                />
                      
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default InnerComp;
