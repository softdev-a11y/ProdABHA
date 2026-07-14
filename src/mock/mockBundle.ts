const mockBundle = {

  "resourceType": "Bundle",
  "type": "collection",
  "id": "bundle-001",
  "timestamp": "2026-07-10T10:30:00Z",
  "entry": [
    {
      "resource": {
        "resourceType": "Patient",
        "id": "PAT001",
        "identifier": [
          {
            "system": "ABHA",
            "value": "dhananjay07@sbx"
          }
        ],
        "name": [
          {
            "text": "Dhananjay Dangadi"
          }
        ],
        "gender": "male",
        "birthDate": "2002-05-18",
        "telecom": [
          {
            "system": "phone",
            "value": "9876543210"
          }
        ]
      }
    },
    {
      "resource": {
        "resourceType": "Encounter",
        "id": "ENC001",
        "status": "finished",
        "period": {
          "start": "2026-05-20T09:00:00Z",
          "end": "2026-05-20T09:45:00Z"
        },
        "serviceType": {
          "text": "General Medicine"
        }
      }
    },
    {
      "resource": {
        "resourceType": "Practitioner",
        "id": "DOC001",
        "name": [
          {
            "text": "Dr. Amit Sharma"
          }
        ],
        "qualification": [
          {
            "code": {
              "text": "MD Physician"
            }
          }
        ]
      }
    },
    {
      "resource": {
        "resourceType": "MedicationRequest",
        "id": "RX001",
        "status": "active",
        "intent": "order",
        "medicationCodeableConcept": {
          "text": "Paracetamol 500 MG"
        },
        "dosageInstruction": [
          {
            "text": "1 Tablet Twice Daily After Food"
          }
        ],
        "authoredOn": "2026-05-20"
      }
    },
    {
      "resource": {
        "resourceType": "MedicationRequest",
        "id": "RX002",
        "status": "active",
        "intent": "order",
        "medicationCodeableConcept": {
          "text": "Pantoprazole 40 MG"
        },
        "dosageInstruction": [
          {
            "text": "1 Tablet Before Breakfast"
          }
        ],
        "authoredOn": "2026-05-20"
      }
    },
    {
      "resource": {
        "resourceType": "DiagnosticReport",
        "id": "LAB001",
        "status": "final",
        "code": {
          "text": "Complete Blood Count"
        },
        "effectiveDateTime": "2026-05-21T10:00:00Z",
        "conclusion": "All values within normal range."
      }
    },
    {
      "resource": {
        "resourceType": "Observation",
        "id": "OBS001",
        "status": "final",
        "code": {
          "text": "Body Temperature"
        },
        "valueQuantity": {
          "value": 98.6,
          "unit": "°F"
        },
        "effectiveDateTime": "2026-05-20T09:15:00Z"
      }
    },
    {
      "resource": {
        "resourceType": "Observation",
        "id": "OBS002",
        "status": "final",
        "code": {
          "text": "Blood Pressure"
        },
        "valueString": "120/80 mmHg",
        "effectiveDateTime": "2026-05-20T09:20:00Z"
      }
    },
    {
      "resource": {
        "resourceType": "DocumentReference",
        "id": "DOCREF001",
        "status": "current",
        "type": {
          "text": "Discharge Summary"
        },
        "date": "2026-05-22T11:00:00Z",
        "description": "Patient discharged in stable condition."
      }
    }
  ]

};

export default mockBundle;