// pages/index.tsx

import { useState, useEffect } from 'react';

const fetchCompositionRecommendations = async (objectsInfo) => {
  const response = await fetch('/api/analyzeComposition', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ objectsInfo }),
  });
  const data = await response.json();
  return data.recommendations;
};

const IndexPage = () => {
  const [objectsInfo, setObjectsInfo] = useState('');
  const [recommendations, setRecommendations] = useState('');

  useEffect(() => {
    // Update objectsInfo with the information from the video analysis
    const updatedObjectsInfo = '...'; // Replace this with the actual information
    setObjectsInfo(updatedObjectsInfo);
  }, []);

  useEffect(() => {
    const getRecommendations = async () => {
      const recs = await fetchCompositionRecommendations(objectsInfo);
      setRecommendations(recs);
    };
    if (objectsInfo) {
      getRecommendations();
    }
  }, [objectsInfo]);

  return (
    <div>
      <h1>Video Composition Analysis</h1>
      <p>Objects Info: {objectsInfo}</p>
      // ...продолжение кода
      <p>Composition Recommendations: {recommendations}</p>
    </div>
  );
};

export default IndexPage;

