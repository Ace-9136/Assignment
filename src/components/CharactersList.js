import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Select, Input, Card, Row, Col, Layout } from "antd";
import axios from "axios";
import "../App.css";
const { Option } = Select;
const { Header, Content } = Layout;

const CharactersList = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  useEffect(() => {
    axios.get("https://rickandmortyapi.com/api/character").then((response) => {
      setCharacters(response.data.results);
    });
  }, []);

  useEffect(() => {
    const filterCharacters = () => {
      let filtered = characters;
      if (nameFilter) {
        filtered = filtered.filter((character) =>
          character.name.toLowerCase().includes(nameFilter.toLowerCase())
        );
      }
      if (statusFilter) {
        filtered = filtered.filter(
          (character) => character.status === statusFilter
        );
      }
      if (genderFilter) {
        filtered = filtered.filter(
          (character) => character.gender === genderFilter
        );
      }
      setFilteredCharacters(filtered);
    };
    filterCharacters();
  }, [nameFilter, statusFilter, genderFilter, characters]);

  return (
    <div className="main">
      <Layout>
        <Header className="header">
          <span className="welcome-text">Welcome!</span>
          <span className="rick-text">Rick and Morty App</span>
        </Header>
        <Content>
          <div className="filters">
            <div className="name">
              <label>Name of Character</label>
              <Input
                className="name-selector"
                placeholder="Name"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
            </div>
            <div>
              <label>Status</label>
              <Select
                className="custom-select"
                placeholder="Status"
                value={statusFilter}
                onChange={(value) => setStatusFilter(value)}
              >
                <Option value="">All</Option>
                <Option value="Alive">Alive</Option>
                <Option value="Dead">Dead</Option>
                <Option value="unknown">Unknown</Option>
              </Select>
              <label>Gender</label>
              <Select
                className="custom-select"
                placeholder="Gender"
                value={genderFilter}
                onChange={(value) => setGenderFilter(value)}
              >
                <Option value="">All</Option>
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Genderless">Genderless</Option>
                <Option value="unknown">Unknown</Option>
              </Select>
            </div>
          </div>
          <Row gutter={[16, 16]}>
            {filteredCharacters.map((character) => (
              <Col key={character.id} xs={24} sm={12} md={8} lg={6}>
                <Link to={`/character/${character.id}`}>
                  <Card
                    hoverable
                    cover={<img alt={character.name} src={character.image} />}
                  >
                    <Card.Meta title={character.name} />
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Content>
      </Layout>
    </div>
  );
};

export default CharactersList;
