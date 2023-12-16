// src/App.jsx

import React, { useState, useEffect } from "react";
import UserForm from "./components/UserForm";
import UserDetails from "./components/UserDetails";
import ColumnChart from "./components/ColumnChart";
import PieChart from "./components/PieChart";
import CalendarChart from "./components/CalendarChart";
import "./App.css";
import Header from "./components/Header";
function App() {
  const [handle, setHandle] = useState("");
  const [codeforcesData, setCodeforcesData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tagCounts, setTagCounts] = useState(null);
  const [ratingCounts, setRatingCounts] = useState(null);
  const [contestData, setContestData] = useState(null);

  useEffect(() => {
    if (codeforcesData) {
      fetchUserSubmissions();
    }
  }, [codeforcesData]);



  const fetchUserSubmissions = async () => {
    try {
      const response = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
      const data = await response.json();
  
      if (data.status === 'OK') {
        const submissions = data.result;
        const tagCounts = countSolvedTagSubmissions(submissions);
        const ratingCounts = countSolvedRatingSubmissions(submissions);
        setTagCounts(tagCounts);
        setRatingCounts(ratingCounts);
  
        const contestData = extractContestData(submissions);
        setContestData(contestData);
      } else {
        setTagCounts(null);
        setRatingCounts(null);
        setContestData(null);
        setError('Failed to fetch user submissions');
      }
    } catch (error) {
      console.error(error);
      setTagCounts(null);
      setRatingCounts(null);
      setContestData(null);
      setError('An error occurred while fetching user submissions');
    }
  };

  const countSolvedTagSubmissions = (submissions) => {
    const solvedTags = {};

    submissions.forEach((submission) => {
      if (submission.verdict === "OK") {
        const problem = submission.problem;
        if (problem && problem.tags) {
          const uniqueTags = new Set(problem.tags);
          uniqueTags.forEach((tag) => {
            solvedTags[tag] = (solvedTags[tag] || 0) + 1;
          });
        }
      }
    });
    console.log(solvedTags);
    return solvedTags;
  };

  const countSolvedRatingSubmissions = (submissions) => {
    const solvedRatings = {};

    submissions.forEach((submission) => {
      if (submission.verdict === "OK") {
        const problem = submission.problem;
        if (problem && problem.rating !== undefined) {
          const rating = problem.rating;
          solvedRatings[rating] = (solvedRatings[rating] || 0) + 1;
        }
      }
    });

    return solvedRatings;
  };

  // Update the extractContestData function in App.jsx

const extractContestData = (submissions) => {
  const solvedOnDays = {};

  submissions.forEach((submission) => {
    if (submission.verdict === 'OK') {
      const contestTime = new Date(submission.creationTimeSeconds * 1000);
      const dayKey = `${contestTime.getFullYear()}-${contestTime.getMonth() + 1}-${contestTime.getDate()}`;
      solvedOnDays[dayKey] = (solvedOnDays[dayKey] || 0) + 1;
    }
  });

  return solvedOnDays;
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/codeforces", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ handle }),
      });
      const data = await response.json();

      if (data.status === "OK") {
        setCodeforcesData(data.result[0]);
        setError(null);
      } else {
        setCodeforcesData(null);
        setTagCounts(null);
        setRatingCounts(null);
        setContestData(null);
        setError("User not found. Please check the Codeforces handle.");
      }
    } catch (error) {
      console.error(error);
      setCodeforcesData(null);
      setTagCounts(null);
      setRatingCounts(null);
      setContestData(null);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const tagChartData = [["Tag", "Number of Questions Solved"]].concat(
    tagCounts ? Object.entries(tagCounts) : []
  );

  const ratingChartData = [["Rating", "Number of Questions Solved"]].concat(
    ratingCounts ? Object.entries(ratingCounts) : []
  );

  return (
    <div className="app">
        <Header title={codeforcesData ? codeforcesData.handle : "Codeforces" } />
        <div className="notheader">
      {!codeforcesData && <div>
        <UserForm
          handle={handle}
          setHandle={setHandle}
          handleSubmit={handleSubmit}
        />
      </div>}
      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {codeforcesData && <UserDetails codeforcesData={codeforcesData} />}

      {tagCounts && (
        <PieChart
          chartData={tagChartData}
          title="Solved Tag-wise Submissions"
        />
      )}

      {ratingCounts && (
        <ColumnChart
          chartData={ratingChartData}
          title="Solved Rating-wise Submissions"
        />
      )}

      {contestData && (
        <CalendarChart contestData={contestData} title="Activity" />
      )}
      </div>
    </div>
  );
}

export default App;
