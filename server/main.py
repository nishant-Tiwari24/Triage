from flask import Flask, request
from flask_cors import CORS 
import json
import re
import joblib
import numpy as np

model = joblib.load('spam_model.pkl')

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/partitioninfo", methods=['GET', 'POST'])
def partition_info():
    if(request.method == 'POST'):
        data = request.data
        print(data)
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

@app.route("/system-logs", methods=['GET'])
def SystemLogs():
    data=[
    {
        "time": "Mon May 13 01:19:30 2024",
        "message": ["0x0", "10", "0", "10", "storqosflt", "2039-04-22T07:06:38.0000000Z"]
    },
    {
        "time": "Mon May 13 01:19:30 2024",
        "message": ["0x0", "10", "0", "7", "bindflt", "2032-10-20T06:52:30.0000000Z"]
    },
    {
        "time": "Mon May 13 01:19:32 2024",
        "message": ["0", "2", "0", "PCIe", "SSD", "512110190592", "KBG40ZNV512G KIOXIA"]
    },
    {
        "time": "Mon May 13 01:19:31 2024",
        "message": ["http://*:5357/", "0", "4", "", "S-1-5-18"]
    },
    {
        "time": "Mon May 13 01:19:31 2024",
        "message": ["http://+:80/Temporary_Listen_Addresses/", "0", "4", "", "S-1-5-18"]
    },
    {
        "time": "Mon May 13 01:19:31 2024",
        "message": ["https://*:5358/", "0", "4", "", "S-1-5-18"]
    },
    {
        "time": "Mon May 13 01:19:31 2024",
        "message": ["https://+:3392/rdp/", "0", "4", "", "S-1-5-18"]
    },
    {
        "time": "Mon May 13 01:19:31 2024",
        "message": ["http://+:3387/rdp/", "0", "4", "", "S-1-5-18"]
    },
    {
        "time": "Mon May 13 01:19:31 2024",
        "message": ["https://+:443/sra_{BA195980-CD49-458b-9E23-C84EE0ADCD75}/", "0", "4", "", "S-1-5-18"]
    },
    {
        "time": "Mon May 13 01:19:31 2024",
        "message": ["http://+:10246/MDEServer/", "0", "4", "", "S-1-5-18"]
    },
    {
        "time": "Mon May 13 01:19:31 2024",
        "message": ["https://+:5986/wsman/", "0", "4", "", "S-1-5-18"]
    },
    {
        "time": "Mon May 13 01:19:31 2024",
        "message": ["http://+:47001/wsman/", "0", "4", "", "S-1-5-18"]
    },
    {
        "time": "Mon May 13 01:19:31 2024",
        "message": ["http://+:5985/wsman/", "0", "4", "", "S-1-5-18"]
    },
    {
        "time": "Mon May 13 01:19:31 2024",
        "message": ["http://+:10247/apps/", "0", "4", "", "S-1-5-18"]
    },
    {
        "time": "Mon May 13 01:19:31 2024",
        "message": ["http://*:2869/", "0", "4", "", "S-1-5-18"]
    },
    {
        "time": "Mon May 13 01:19:31 2024",
        "message": ["https://+:10245/WMPNSSv4/", "0", "4", "", "S-1-5-18"]
    },
    {
        "time": "Mon May 13 01:19:31 2024",
        "message": ["http://+:10243/WMPNSSv4/", "0", "4", "", "S-1-5-18"]
    },
    {
        "time": "Mon May 13 01:19:32 2024",
        "message": ""
    },
    {
        "time": "Mon May 13 01:19:32 2024",
        "message": ["C:\\Windows\\System32\\DriverStore\\FileRepository\\dptf_cpu.inf_amd64_897ea327b3fe52f7\\esif_uf.exe", "4104", "{381b4222-f694-41f0-9685-ff5bb260df2e}", "{381b4222-f694-41f0-9685-ff5bb260df2e}"]
    },
    {
        "time": "Mon May 13 01:19:32 2024",
        "message": ["C:\\Windows\\System32\\DriverStore\\FileRepository\\dptf_cpu.inf_amd64_897ea327b3fe52f7\\esif_uf.exe", "4104", "{381b4222-f694-41f0-9685-ff5bb260df2e}", "{381b4222-f694-41f0-9685-ff5bb260df2e}"]
    },
    {
        "time": "Mon May 13 01:19:33 2024",
        "message": ["mfevtp"]
    },
    {
        "time": "Mon May 13 01:19:32 2024",
        "message": ["VMICTimeProvider"]
    },
    {
        "time": "Mon May 13 01:19:32 2024",
        "message": ["No such host is known. (0x80072AF9)", "15", "time.windows.com,0x9"]
    },
    {
        "time": "Mon May 13 01:19:34 2024",
        "message": ["mfefire"]
    },
    {
        "time": "Mon May 13 01:19:34 2024",
        "message": ["protectedmodulehostservice"]
    },
    {
        "time": "Mon May 13 01:19:34 2024",
        "message": ["mcbootdelaystartsvc"]
    },
    {
        "time": "Mon May 13 01:19:34 2024",
        "message": ["mmscom"]
    },
    {
        "time": "Mon May 13 01:19:34 2024",
        "message": ["No such host is known. (0x80072AF9)", "15", "time.windows.com,0x9"]
    },
    {
        "time": "Mon May 13 01:19:38 2024",
        "message": ["156", "\\??\\C:\\ProgramData\\Microsoft\\Windows\\WindowsApps\\MicrosoftCorporationII.WindowsSubsystemForLinux_2.1.5.0_x64__8wekyb3d8bbwe\\Cache\\f60e0bc25b53120f_COM15.dat", "1", "1"]
    },
    {
        "time": "Mon May 13 01:19:39 2024",
        "message": ["", "Filter pause start"]
    },
    {
        "time": "Mon May 13 01:19:39 2024",
        "message": ["", "Filter pause complete"]
    },
    {
        "time": "Mon May 13 01:19:39 2024",
        "message": ["", "Filter detach start"]
    },
    {
        "time": "Mon May 13 01:19:39 2024",
        "message": ["", "Filter detach complete"]
    },
    {
        "time": "Mon May 13 01:19:39 2024",
        "message": ["1", "S-1-5-21-1154311893-163028936-1993660432-1001"]
    },
    {
        "time": "Mon May 13 01:19:40 2024",
        "message": ["29", "\\??\\C:\\Users\\daved\\ntuser.dat", "6688768", "6008832"]
    },
    {
        "time": "Mon May 13 01:19:40 2024",
        "message": ["63", "\\??\\C:\\Users\\daved\\AppData\\Local\\Microsoft\\Windows\\UsrClass.dat", "15021", "1281"]
    },
    {
        "time": "Mon May 13 01:19:40 2024",
        "message": ["36", "790E58B4-7939-4434-9358-89AE7DDBE87E", "36", "790E58B4-7939-4434-9358-89AE7DDBE87E"]
    },
    {
        "time": "Mon May 13 01:19:40 2024",
        "message": ["36", "790E58B4-7939-4434-9358-89AE7DDBE87E", "36", "790E58B4-7939-4434-9358-89AE7DDBE87E"]
    }
    ]
    print(data)
    return data

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json  
    email_content = data['email_content'] 

    # preprocessed_email = preprocess_text(email_content)
    # prediction = model.predict([preprocessed_email])

    # return jsonify({'prediction': 'spam' if prediction[0] == 1 else 'not spam'})
    return "not spam"


if __name__ == '__main__':
    app.run(debug=True)


