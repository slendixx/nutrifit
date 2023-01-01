import Head from "next/head";
import Image from "next/image";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function Home() {
    return (
        <Stack sx={{ width: "100%", p: 1 }} spacing={2}>
            <Alert severity="error" variant="filled">
                This is an error alert — check it out!
            </Alert>
            <Alert severity="warning" variant="filled">
                This is a warning alert — check it out!
            </Alert>
            <Alert severity="info" variant="filled">
                This is an info alert — check it out!
            </Alert>
            <Alert severity="success" variant="filled">
                This is a success alert — check it out!
            </Alert>
        </Stack>
    );
}
