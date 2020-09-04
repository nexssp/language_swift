// Nexss Programmer 2.x template
import Foundation

let nexssStdin = readLine()
let data = Data(nexssStdin!.utf8)

do {
    // make sure this JSON is in the format we expect
    if var json = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] {
        json["helloFromSwift"] = "5.2.5" // Change later to the runtime version 

        let jsonData = try JSONSerialization.data(withJSONObject: json, options: .prettyPrinted) 
        
        print(String(data: jsonData, encoding: .utf8)!)
    }
} catch let error as NSError {
    print("Error: \(error.localizedDescription)")
}


