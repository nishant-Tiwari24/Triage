from flask import Flask, request
from flask_cors import CORS 
import json
import re

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/partitioninfo", methods=['GET', 'POST'])
def partition_info():
    json_data = {
    "args": ["mmls", "sample.raw"],
    "returncode": 0,
    "stdout": {
        "partition_table": "GUID Partition Table (EFI)",
        "offset_sector": 0,
        "unit_size": "512-byte sectors",
        "partitions": [
        {
            "slot": "000",
            "start": 0,
            "end": 0,
            "length": 1,
            "description": "Safety Table"
        },
        {
            "slot": "001",
            "start": 0,
            "end": 33,
            "length": 34,
            "description": "Unallocated"
        },
        {
            "slot": "002",
            "start": 1,
            "end": 1,
            "length": 1,
            "description": "GPT Header"
        },
        {
            "slot": "003",
            "start": 2,
            "end": 33,
            "length": 32,
            "description": "Partition Table"
        },
        {
            "slot": "004",
            "start": 34,
            "end": 32767,
            "length": 32734,
            "description": "Microsoft reserved partition"
        },
        {
            "slot": "005",
            "start": 32768,
            "end": 1708031,
            "length": 1675264,
            "description": "Basic data partition"
        },
        {
            "slot": "006",
            "start": 1708032,
            "end": 1978367,
            "length": 270336,
            "description": "Unallocated"
        }
        ]
    },
    "stderr": ""
    }
    print(json_data)
    return json.dumps(json_data)

@app.route("/sample_info", methods=['GET'])
def sample_info():
    json_data = {
        1: '''(True, CompletedProcess(args=['icat', '-o', '32768', 'sample.raw', '40'], returncode=0, stdout='ï»¿<?xml version=\'1.0\' encoding=\'utf-8\'?>\n\n<WindowsRE version="2.0">\n  <WinreBCD id="{ec9e2cda-63d3-11ee-bd2c-af2423a570b6}"/>\n  <WinreLocation path="\\Recovery\\WindowsRE" id="0" offset="188570664960" guid="{1cb3eeb3-fd89-4fc4-a7d5-34f852f5aa52}"/>\n  <ImageLocation path="" id="0" offset="0" guid="{00000000-0000-0000-0000-000000000000}"/>\n  <PBRImageLocation path="" id="0" offset="0" guid="{00000000-0000-0000-0000-000000000000}" index="0"/>\n  <PBRCustomImageLocation path="" id="0" offset="0" guid="{00000000-0000-0000-0000-000000000000}" index="0"/>\n  <InstallState state="1"/>\n  <OsInstallAvailable state="0"/>\n  <CustomImageAvailable state="0"/>\n  <IsAutoRepairOn state="1"/>\n  <WinREStaged state="0"/>\n  <OperationParam path=""/>\n  <OperationPermanent state="0"/>\n  <OsBuildVersion path=""/>\n  <OemTool state="0"/>\n  <IsServer state="0"/>\n  <DownlevelWinreLocation path="" id="0" offset="0" guid="{00000000-0000-0000-0000-000000000000}"/>\n  <IsWimBoot state="0"/>\n  <NarratorScheduled state="0"/>\n  <ScheduledOperation state="4"/>\n</WindowsRE>', stderr=''))'''
    }
    return json.dumps(json_data[1])


@app.route("/all-sample", methods=['GET', 'POST'])
def all_sample():
    files = [
    {
        "file_info": "r/r",
        "file_id": "4-128",
        "directory_id": "1",
        "file_path": "sample.raw/fs0/$AttrDef",
        "status": "readable",
        "allocation": "allocated"
    },
    {
        "file_info": "r/r",
        "file_id": "8-128-2",
        "directory_id": "",
        "file_path": "sample.raw/fs0/$BadClus",
        "status": "readable",
        "allocation": "allocated"
    },
    {
        "file_info": "r/r",
        "file_id": "6-128-4",
        "directory_id": "",
        "file_path": "sample.raw/fs0/$Bitmap",
        "status": "readable",
        "allocation": "allocated"
    },
    {
        "file_info": "r/r",
        "file_id": "7-128-1",
        "directory_id": "",
        "file_path": "sample.raw/fs0/$Boot",
        "status": "readable",
        "allocation": "allocated"
    },
    {
        "file_info": "d/d",
        "file_id": "11-144-4",
        "directory_id": "",
        "file_path": "sample.raw/fs0/$Extend",
        "status": "directory",
        "allocation": "allocated"
    },
    {
        "file_info": "+ d/d",
        "file_id": "29-144-2",
        "directory_id": "",
        "file_path": "sample.raw/fs0/$Extend/$Deleted",
        "status": "directory",
        "allocation": "allocated"
    },
    {
        "file_info": "+ r/r",
        "file_id": "25-144-2",
        "directory_id": "",
        "file_path": "sample.raw/fs0/$Extend/$ObjId",
        "status": "readable",
        "allocation": "allocated"
    },
    {
        "file_info": "+ r/r",
        "file_id": "24-144-3",
        "directory_id": "",
        "file_path": "sample.raw/fs0/$Extend/$Quota",
        "status": "readable",
        "allocation": "allocated"
    },
    {
        "file_info": "+ r/r",
        "file_id": "26-144-2",
        "directory_id": "",
        "file_path": "sample.raw/fs0/$Extend/$Reparse",
        "status": "readable",
        "allocation": "allocated"
    },
    {
        "file_info": "+ d/d",
        "file_id": "27-144-2",
        "directory_id": "",
        "file_path": "sample.raw/fs0/$Extend/$RmMetadata",
        "status": "directory",
        "allocation": "allocated"
    },
    {
        "file_info": "++ r/r",
        "file_id": "28-128-4",
        "directory_id": "",
        "file_path": "sample.raw/fs0/$Extend/$RmMetadata/$Repair",
        "status": "readable",
        "allocation": "slack space"
    },
    {
        "file_info": "++ d/d",
        "file_id": "31-144-2",
        "directory_id": "",
        "file_path": "sample.raw/fs0/$Extend/$RmMetadata/$Txf",
        "status": "directory",
        "allocation": "slack space"
    },
    {
        "file_info": "++ r/r",
        "file_id": "28-128-6",
        "directory_id": "",
        "file_path": "sample.raw/fs0/$Extend/$RmMetadata/$Repair",
        "status": "readable",
        "allocation": "slack space"
    },
    {
        "file_info": "++ r/r",
        "file_id": "28-128-8",
        "directory_id": "",
        "file_path": "sample.raw/fs0/$Extend/$RmMetadata/$Repair",
        "status": "readable",
        "allocation": "slack space"
    },
    {
        "file_info": "+++ r/r",
        "file_id": "32-128-2",
        "directory_id": "",
        "file_path": "sample.raw/fs0/$Extend/$RmMetadata/$TxfLog/$Tops",
        "status": "readable",
        "allocation": "unallocated"
    },
    {
        "file_info": "+++ r/r",
        "file_id": "34-128-1",
        "directory_id": "",
        "file_path": "sample.raw/fs0/$Extend/$RmMetadata/$TxfLog/$TxfLogContainer00000000000000000001",
        "status": "readable",
        "allocation": "unallocated"
    },
    {
        "file_info": "+ r/r",
        "file_id": "46-128-3",
        "directory_id": "",
        "file_path": "sample.raw/fs0/$Extend/$UsnJrnl",
        "status": "readable",
        "allocation": "allocated"
    },
    {
        "file_info": "r/r",
        "file_id": "0-128-6",
        "directory_id": "",
        "file_path": "sample.raw/fs0/$MFT",
        "status": "readable",
        "allocation": "allocated"
    },
    {
        "file_info": "r/r",
        "file_id": "9-128-8",
        "directory_id": "",
        "file_path": "sample.raw/fs0/$Secure",
        "status": "readable",
        "allocation": "allocated"
    },
    {
        "file_info": "d/d ",
        "file_id": "36-144-1",
        "directory_id": "",
        "file_path": "sample.raw/fs0/Recovery",
        "status": "directory",
        "allocation": "allocated"
    },
    {
        "file_info": "++ r/r",
        "file_id": "38-128-1",
        "directory_id": "",
        "file_path": "sample.raw/fs0/Recovery/WindowsRE/Winre.wim",
        "status": "readable",
        "allocation": "slack space"
    },
    {
        "file_info": "+ d/d ",
        "file_id": "44-144-1",
        "directory_id": "",
        "file_path": "sample.raw/fs0/System Volume Information/FveDecryptedVolumeFolder",
        "status": "directory",
        "allocation": "allocated"
    },
    {
        "file_info": "++ r/r",
        "file_id": "49-128-3",
        "directory_id": "",
        "file_path": "sample.raw/fs0/System Volume Information/SPP/snapshot-2",
        "status": "readable",
        "allocation": "slack space"
    }
]


    if request.method == 'GET':
        return json.dumps(files), 200

    elif request.method == 'POST':
        try:
            data = request.get_json()
            if not data:
                return json.dumps({"error": "No data provided"}), 400
            return json.dumps({"message": "POST request received", "data": data}), 200
        except Exception as e:
            return json.dumps({"error": str(e)}), 500

    return json.dumps({"error": "Method not allowed"}), 405


@app.route("/img_info", methods=['GET', 'POST'])
def img_info():
    img_info={
  "image": "sample.raw",
  "file_format": "raw",
  "virtual_size": {
    "size_in_mib": 966,
    "size_in_bytes": 1012924416
  },
  "disk_size": {
    "size_in_mib": 712
  },
  "child_node": {
    "path": "/file",
    "filename": "sample.raw",
    "protocol_type": "file",
    "file_length": {
      "size_in_mib": 966,
      "size_in_bytes": 1012924416
    },
    "disk_size": {
      "size_in_mib": 712
    }
  }
}

    return json.dumps(img_info)

@app.route("/mft-entry", methods=['GET'])
def mft_entry():
    mft_data = {
        "Entry": 40,
        "Sequence": 1,
        "$LogFile_Sequence_Number": 10513241,
        "Allocated_File": True,
        "Links": 1,
        "$STANDARD_INFORMATION": {
            "Flags": ["Hidden", "System", "Not Content Indexed"],
            "Owner_ID": 0,
            "Security_ID": "263 (S-1-5-32-544)",
            "Created": "2024-08-20T09:47:30.433150900+05:30",
            "File_Modified": "2024-08-20T09:47:30.433150900+05:30",
            "MFT_Modified": "2024-08-20T09:47:30.433150900+05:30",
            "Accessed": "2024-09-12T02:58:40.738497100+05:30"
        },
        "$FILE_NAME": {
            "Flags": ["Archive", "Not Content Indexed"],
            "Name": "ReAgent.xml",
            "Parent_MFT_Entry": 37,
            "Sequence": 1,
            "Allocated_Size": 0,
            "Actual_Size": 0,
            "Created": "2024-08-20T09:47:30.433150900+05:30",
            "File_Modified": "2024-08-20T09:47:30.433150900+05:30",
            "MFT_Modified": "2024-08-20T09:47:30.433150900+05:30",
            "Accessed": "2024-08-20T09:47:30.433150900+05:30"
        },
        "Attributes": [
            {
                "Type": "$STANDARD_INFORMATION",
                "Name": "N/A",
                "Resident": True,
                "Size": 72
            },
            {
                "Type": "$FILE_NAME",
                "Name": "N/A",
                "Resident": True,
                "Size": 88
            },
            {
                "Type": "$DATA",
                "Name": "N/A",
                "Non_Resident": True,
                "Size": 1070,
                "init_size": 1070
            }
        ]
    }
    
    return mft_data

if __name__ == '__main__':
    app.run(debug=True)

