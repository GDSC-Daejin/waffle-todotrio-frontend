// ProgressPie.js

import { patternDotsDef, patternLinesDef } from "@nivo/core";
import { ResponsivePie } from "@nivo/pie";

const ProgressPie = ({ inProgressCount, completedCount, delayedCount }) => {
    const data = [
        {
            id: "진행 중",
            label: "진행 중",
            value: inProgressCount,
            color: "#3B82F6"
            // #3B82F6
        },
        {
            id: "완료",
            label: "완료",
            value: completedCount,
            color: "#34C759"
            // #34C759
        },
        {
            id: "지연",
            label: "지연",
            value: delayedCount,
            color: "#FBBF24"
            //#FBBF24
        }
    ];

    return (
        <div style={{width:'300px', height:'300px'}}>
            <ResponsivePie
                data={data}
                innerRadius={0.5}
                padAngle={2}
                cornerRadius={5}
                arcLinkLabelsColor={{ from: 'color' }}
                enableArcLinkLabels={false}
                enableArcLabels={false}
                arcLabel={(d) => (d.value !== 0 ? `${d.id}: ${d.value}` : "")}
                arcLabelsRadiusOffset={0.5}
                defs={[
                    patternDotsDef('dot1', { color: '#3B82F6' }),
                    patternDotsDef('dot2', { color: '#34C759' }),
                    patternDotsDef('dot3', { color: '#FBBF24' }),
                ]}
                isInteractive={true}
                fill={[
                    {
                        match: {
                            id: '진행 중'
                        },
                        id: 'dot1'
                    },
                    {
                        match: {
                            id: '완료'
                        },
                        id: 'dot2'
                    },
                    {
                        match: {
                            id: '지연'
                        },
                        id: 'dot3'
                    },
                ]}
                tooltip={({ datum }) => (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'white', 
                        padding: '10px',
                        borderRadius: '5px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <div
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: datum.data.color, 
                          marginRight: '8px',
                        }}
                      />
                      <span>
                        <strong>{datum.id} : {datum.value}</strong>
                      </span>
                    </div>
                  )}
            />
        </div>
    );
};

export default ProgressPie;