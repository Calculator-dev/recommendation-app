import { styled } from '@mui/system'
import { Backdrop, Button, Modal, Paper } from "@mui/material"
import React, { useState } from 'react'

const Root = styled("div")({
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
})

const Card = styled(Paper)({
    width: "300px",
    height: "450px",
    marginBottom: "20px",
    overflow: "hidden",
    position: "relative",
    padding: "10px"
})

const Description = styled("p")({
    textOverflow: "ellipsis",
    overflow: "hidden",
    height: "100px",
    textAlign: "left",
})

const Title = styled("h1")({
    fontSize: "20px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
})

const Authors = styled("h5")({
    fontSize: "15px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap"
})

const Details = styled(Button)({
    position: "absolute",
    bottom: "20px",
    left: "105px"
})

const Thumbnail = styled("img")({
    width: "100px",
    height: "150px"
})

const Popup = styled(Modal)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
})

const PopupCard = styled(Paper)({
    width: "500px",
    height: "90vh",
    position: "relative",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    textOverflow: "ellipsis",
    overflow: "scroll",
})


export default function BookCards({ thumbnail, authors, title, description }) {


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (

        <Root>
            <div >
                <Card className="card">
                    <Thumbnail src={thumbnail} alt="picture" />
                    <Title>{title}</Title>
                    <Authors>{authors}</Authors>
                    <Description>{description}</Description>
                    <Details variant="contained" color="primary" onClick={handleOpen}>Details</Details>
                </Card>
            </div>
            <Popup
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <PopupCard>
                    <img style={{ margin: "0 auto" }} src={thumbnail} alt="slika" />
                    <h1>{title}</h1>
                    <p style={{ fontWeight: "900" }}>{authors}</p>
                    <p style={{ textAlign: "left" }}>{description}</p>
                </PopupCard>

            </Popup>
        </Root>
    )
}