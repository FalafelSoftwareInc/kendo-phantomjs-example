using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExampleKendoExport
{
    class Program
    {
        static void Main(string[] args)
        {
            var inputString = GetStringInput();

            Process compiler = new Process();

            compiler.StartInfo.FileName = "phantomjs";
            //compiler.StartInfo.Arguments = "phantomexport.js";
            compiler.StartInfo.Arguments = " --remote-debugger-port=9000 phantomexport.js -infile  '" + inputString + "'";
            
            compiler.StartInfo.CreateNoWindow = false;
            compiler.StartInfo.UseShellExecute = false;
            compiler.Start();
            Console.ReadLine();
        }

        private static string GetStringInput()
        {
            return
                "[{\"name\":\"Jane Doe\",\"age\":30},{\"name\":\"John Doe\",\"age\":33},{\"name\":\"Bob Smith\",\"age\":45},{\"name\":\"Barbara Smith\",\"age\":42}]";
        }
    }
}
