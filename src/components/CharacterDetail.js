import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spin, Card, Descriptions } from "antd";
import axios from "axios";
import "../App.css";

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => {
        setCharacter(response.data);
      });
  }, [id]);

  if (!character) {
    return <Spin />;
  }

  return (
    <div className="main">
      <Card
        cover={<img alt={character.name} src={character.image} />}
        style={{ width: 300 }}
      >
        <Card.Meta title={character.name} description={character.species} />
      </Card>
      <Descriptions title="Character Details">
        <Descriptions.Item label="Status">{character.status}</Descriptions.Item>
        <Descriptions.Item label="Gender">{character.gender}</Descriptions.Item>
        <Descriptions.Item label="Origin">
          {character.origin.name}
        </Descriptions.Item>
        <Descriptions.Item label="Location">
          {character.location.name}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default CharacterDetail;
