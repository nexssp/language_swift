// Nexss Programmer 2.x
import Foundation

let nexssStdin = readLine()

let json = try? JSONSerialization.jsonObject(with: nexssStdin, options: [])

