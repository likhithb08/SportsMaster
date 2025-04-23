import React from "react";

const matches = [
  {
    date: "2025-05-01",
    time: "14:00",
    opponent: "Team Alpha",
    event: "Quarter Finals - Spring Cup",
  },
  {
    date: "2025-05-05",
    time: "18:00",
    opponent: "Team Bravo",
    event: "Semi Finals - Spring Cup",
  },
  {
    date: "2025-05-10",
    time: "16:30",
    opponent: "Team Charlie",
    event: "Finals - Spring Cup",
  },
];

export default function PlayerScheduleTable() {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Player Match Schedule</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Time</th>
              <th className="py-2 px-4 text-left">Opponent</th>
              <th className="py-2 px-4 text-left">Event</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="py-2 px-4">{match.date}</td>
                <td className="py-2 px-4">{match.time}</td>
                <td className="py-2 px-4">{match.opponent}</td>
                <td className="py-2 px-4">{match.event}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
