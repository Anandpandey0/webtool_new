import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { firstCharToLowerCase } from "@/utils/helperFunctions";
import { useBhoomiscoreData } from "@/custom_hooks/ useBhoomiscoreData";

function createData(name, village, farmArea, currentCrop, bhoomiscore) {
  const bhoomiscoreString = bhoomiscore.toString() + "/ 10";
  return {
    name,
    village,
    farmArea,
    currentCrop,
    bhoomiscore: bhoomiscoreString,
  };
}

const LocationDB = [
  "Bhagwanpur",
  "Dhandera",
  "Mukliali Dundi",
  "Nagla Koyal",
  "Pirpura",
  "Shikarpur",
  "Talheri",
  "Zainpur Jhanjheri",
];

export default function BasicTable() {
  const [season, setSeason] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [rows, setRows] = React.useState([]);
  const bhoomiscoreData = useBhoomiscoreData();

  const handleSeasonChange = (event) => {
    const selectedSeason = event.target.value;
    setSeason(selectedSeason);

    let seasonLower = selectedSeason; // Use a variable instead of a constant
    let seasonSpell = selectedSeason;

    if (selectedSeason === "Rabi") {
      seasonLower = firstCharToLowerCase(selectedSeason);
    } else {
      seasonSpell = "Kharib";
    }

    const filteredData = bhoomiscoreData.filter((i) => i.Village === location);

    const updatedRows = filteredData.map((i) =>
      createData(
        i.Name,
        location,
        i.Area,
        i[`Current_${seasonLower}`], // Use the modified season
        i[`2023_${seasonSpell}`] // Use the selected season directly
      )
    );
    // console.log(filteredData[0])
    // console.log(updatedRows[0][`Current_${seasonLower}`])
    setRows(updatedRows);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);

    setSeason(""); // Reset the season state
    setRows([]);
  };

  return (
    <div>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <FormControl style={{ marginRight: "10px", width: "25vh" }}>
          <InputLabel id="season-label">Season</InputLabel>
          <Select
            labelId="season-label"
            id="season-select"
            value={season}
            label="Season"
            disabled={location ? false : true}
            onChange={handleSeasonChange}
          >
            <MenuItem value={"Kharif"}>Kharif</MenuItem>
            <MenuItem value={"Rabi"}>Rabi</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={{ marginRight: "10px", width: "25vh" }}>
          <InputLabel id="location-label">Location</InputLabel>
          <Select
            labelId="location-label"
            id="location-select"
            value={location}
            label="Location"
            onChange={handleLocationChange}
          >
            {LocationDB.map((locationItem, index) => (
              <MenuItem key={index + 1} value={locationItem}>
                {locationItem}
              </MenuItem>
            ))}
            {/* <MenuItem value={'North'}>North</MenuItem> */}
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Farmers</TableCell>
              <TableCell align="right">Village</TableCell>
              <TableCell align="right">Farm Area</TableCell>
              <TableCell align="right">Current Crop</TableCell>
              <TableCell align="right">Bhoomiscore({season})</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.village}</TableCell>
                <TableCell align="right">{row.farmArea}</TableCell>
                <TableCell align="right">{row.currentCrop}</TableCell>
                <TableCell align="right">{row.bhoomiscore}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
