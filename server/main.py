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
    files = {
    "files": [
        { "id": 1, "path": "sample.raw/fs0/$AttrDef", "name": "$AttrDef" },
        { "id": 2, "path": "sample.raw/fs0/$BadClus", "name": "$BadClus" },
        { "id": 3, "path": "sample.raw/fs0/$Bitmap", "name": "$Bitmap" },
        { "id": 4, "path": "sample.raw/fs0/$Boot", "name": "$Boot" },
        { "id": 5, "path": "sample.raw/fs0/$Extend", "name": "$Extend" },
        { "id": 6, "path": "sample.raw/fs0/$Extend/$Deleted", "name": "$Deleted" },
        { "id": 7, "path": "sample.raw/fs0/$Extend/$ObjId", "name": "$ObjId" },
        { "id": 8, "path": "sample.raw/fs0/$Extend/$Quota", "name": "$Quota" },
        { "id": 9, "path": "sample.raw/fs0/$Extend/$Reparse", "name": "$Reparse" },
        { "id": 10, "path": "sample.raw/fs0/$Extend/$RmMetadata", "name": "$RmMetadata" },
        { "id": 11, "path": "sample.raw/fs0/$Extend/$RmMetadata/$Repair", "name": "$Repair" },
        { "id": 12, "path": "sample.raw/fs0/$Extend/$RmMetadata/$Txf", "name": "$Txf" },
        { "id": 13, "path": "sample.raw/fs0/$Extend/$RmMetadata/$TxfLog", "name": "$TxfLog" },
        { "id": 14, "path": "sample.raw/fs0/$Extend/$RmMetadata/$TxfLog/$Tops", "name": "$Tops" },
        { "id": 15, "path": "sample.raw/fs0/$Extend/$RmMetadata/$TxfLog/$TxfLog.blf", "name": "$TxfLog.blf" },
        { "id": 16, "path": "sample.raw/fs0/$Extend/$RmMetadata/$TxfLog/$TxfLogContainer00000000000000000001", "name": "$TxfLogContainer00000000000000000001" },
        { "id": 17, "path": "sample.raw/fs0/$Extend/$RmMetadata/$TxfLog/$TxfLogContainer00000000000000000002", "name": "$TxfLogContainer00000000000000000002" },
        { "id": 18, "path": "sample.raw/fs0/$Extend/$UsnJrnl", "name": "$UsnJrnl" },
        { "id": 19, "path": "sample.raw/fs0/$LogFile", "name": "$LogFile" },
        { "id": 20, "path": "sample.raw/fs0/$MFT", "name": "$MFT" },
        { "id": 21, "path": "sample.raw/fs0/$MFTMirr", "name": "$MFTMirr" },
        { "id": 22, "path": "sample.raw/fs0/$Secure", "name": "$Secure" },
        { "id": 23, "path": "sample.raw/fs0/$UpCase", "name": "$UpCase" },
        { "id": 24, "path": "sample.raw/fs0/$Volume", "name": "$Volume" },
        { "id": 25, "path": "sample.raw/fs0/Recovery", "name": "Recovery" },
        { "id": 26, "path": "sample.raw/fs0/Recovery/WindowsRE", "name": "WindowsRE" },
        { "id": 27, "path": "sample.raw/fs0/Recovery/WindowsRE/boot.sdi", "name": "boot.sdi" },
        { "id": 28, "path": "sample.raw/fs0/Recovery/WindowsRE/ReAgent.xml", "name": "ReAgent.xml" },
        { "id": 29, "path": "sample.raw/fs0/Recovery/WindowsRE/Winre.wim", "name": "Winre.wim" },
        { "id": 30, "path": "sample.raw/fs0/System Volume Information", "name": "System Volume Information" },
        { "id": 31, "path": "sample.raw/fs0/System Volume Information/AadRecoveryPasswordDelete", "name": "AadRecoveryPasswordDelete" },
        { "id": 32, "path": "sample.raw/fs0/System Volume Information/ClientRecoveryPasswordRotation", "name": "ClientRecoveryPasswordRotation" },
        { "id": 33, "path": "sample.raw/fs0/System Volume Information/FveDecryptedVolumeFolder", "name": "FveDecryptedVolumeFolder" },
        { "id": 34, "path": "sample.raw/fs0/System Volume Information/SPP", "name": "SPP" },
        { "id": 35, "path": "sample.raw/fs0/System Volume Information/SPP/metadata-2", "name": "metadata-2" },
        { "id": 36, "path": "sample.raw/fs0/System Volume Information/SPP/OnlineMetadataCache", "name": "OnlineMetadataCache" },
        { "id": 37, "path": "sample.raw/fs0/System Volume Information/SPP/OnlineMetadataCache/{5068940f-60e5-4950-bd95-601dba9c98fe}_OnDiskSnapshotProp", "name": "{5068940f-60e5-4950-bd95-601dba9c98fe}_OnDiskSnapshotProp" },
        { "id": 38, "path": "sample.raw/fs0/System Volume Information/SPP/snapshot-2", "name": "snapshot-2" },
        { "id": 39, "path": "sample.raw/fs0/System Volume Information/tracking.log", "name": "tracking.log" },
        { "id": 40, "path": "sample.raw/fs0/System Volume Information/{3808876b-c176-4e48-b7ae-04046e6cc752}", "name": "{3808876b-c176-4e48-b7ae-04046e6cc752}" },
        { "id": 41, "path": "sample.raw/fs0/System Volume Information/{a710ccbc-7032-11ef-add2-f889d212610a}{3808876b-c176-4e48-b7ae-04046e6cc752}", "name": "{a710ccbc-7032-11ef-add2-f889d212610a}{3808876b-c176-4e48-b7ae-04046e6cc752}" },
        { "id": 42, "path": "sample.raw/fs0/$OrphanFiles", "name": "$OrphanFiles" }
    ]
}

    return json.dumps(files) 

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

