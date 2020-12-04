import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import './InfoCard.scss'
import "./CountryTable.scss";
import numeral from "numeral";
const CountryTable = (props) => {
  let totalCasesCountry = 0;

  if (props.data) {
    props.data.map((item) => {
      return (totalCasesCountry += item.cases);
    });
  }

  return (
    <Card className="CountryTableContainer">
      <CardContent className="card-body">
        <TableContainer className="table">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Country Name</TableCell>
                <TableCell>Cases</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data && (
                <TableRow
                  className={`table-row ${
                    props.selected ==="worldwide" ? "active" : ""
                  }`}
                  onClick={() => props.onSelect("worldwide")}
                >
                  <TableCell></TableCell>
                  <TableCell>World</TableCell>
                  <TableCell>
                    {numeral(totalCasesCountry).format("0,0")}
                  </TableCell>
                </TableRow>
              )}

              {props.data &&
                props.data.map((item, index) => (
                  <TableRow
                    key={item.country}
                    className={`table-row ${
                      props.selected === item.countryInfo.iso2 ? "active" : ""
                    }`}
                    onClick={() => props.onSelect(item.countryInfo.iso2)}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.country}</TableCell>
                    <TableCell>{numeral(item.cases).format("0,0")}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
export default CountryTable;
