import { R2Bucket } from '@cloudflare/workers-types';
import { regions, dataType, spatial, windSpeed, timeFrame } from "$lib/constants";

declare global {
	namespace App {
        interface Platform {
            env: {
                r2_bucket: R2Bucket
            }
            cf: CfProperties
            ctx: ExecutionContext
        }
    }

    type RegionObj = {
        name: string;
        labelLocation: [number, number];
        color: string;
        map: string;
    };
    type RegionsObj = typeof regions;
    type RegionNames = typeof regions[number]['name'];
    type DataTypeNames = typeof dataType[number]['name'];
    type DataTypeDisplayNames = typeof dataType[number]['displayName'];
    type SpatialNames = typeof spatial[number]['name'];
    type SpatialObjs = typeof spatial;
    type WindSpeedNames = typeof windSpeed[number]['name'];
    type WindSpeedObjs = typeof windSpeed;
    type TimeFrameNames = typeof timeFrame[number]['name'];
    type TimeFrameObjs = typeof timeFrame;
    
    type TimeFrameNamesData = number[];
    type RegionNameData = Record<TimeFrameNames, TimeFrameNameData>;
    type WindSpeedNameData = Record<RegionNames, RegionNameData>;
    type SpatialNameData = Record<WindSpeedNames, WindSpeedNameData>;
    type FileData = Record<SpatialNames, SpatialNameData>;

    type DataTypeNameData = {
        end_month: string;
        data: FileData;
        message?: string;
    };
    
    type FetchFileDataProp = Record<DataTypeNames, DataTypeNameData>

    type ChartTimeseriesItem = {
        value: number;
        year: number;
        group: DataTypeDisplayNames;
    }
    type ChartGroupItem = {
        group: DataTypeDisplayNames;
        values: ChartTimeseriesItem[];
    }

    type Metadata = {
        windspeed: string;
        region: string;
        spatial: string;
        timeframe: string;
    }
}

export {};