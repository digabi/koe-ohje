#!/usr/bin/python2
# -*- coding: utf-8 -*-

import argparse, sys

from PyQt4.QtCore import *
from PyQt4.QtGui import *
from PyQt4.QtWebKit import *

APP_ICON_PATH='/usr/share/digabi-koe-ohje/help-browser.png'

class SharedClass (QObject):
    @pyqtSlot(str)
    def copy_to_clipboard(self, value):
        clipboard = QApplication.clipboard()
        clipboard.setText(value)
        
    @pyqtSlot(str)
    def write_to_stdout(self, value):
        print("[digabi-koe-browser] %s" % (value))
        sys.stdout.flush()

class Window (QWidget):
    def __init__(self):
        super(Window, self).__init__()
        self.view = QWebView(self)
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0,0,0,0)
        layout.addWidget(self.view)

        self.sharedclass = SharedClass(self)
        self.view.page().mainFrame().addToJavaScriptWindowObject("sharedclass", self.sharedclass)

    def load_url (self, url):
        self.view.load(QUrl(url))

sc = SharedClass()

def appExiting ():
    sc.write_to_stdout("exiting")
    
def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-W', '--width', dest='width', type=int, default=500, help='Browser window width')
    parser.add_argument('-H', '--height', dest='height', type=int, default=300, help='Browser window height')
    parser.add_argument('-x', '--positionx', dest='posx', type=int, default=1, help='Window position (X)')
    parser.add_argument('-y', '--positiony', dest='posy', type=int, default=1, help='Window position (Y)')
    parser.add_argument('-t', '--title', dest='title', type=str, default="Help", help='Window title')
    parser.add_argument('url', type=str, help='URL of the help file')
    

    args = parser.parse_args()

    sc.write_to_stdout("starting")
	
    # Encode window title to ISO-8859-15
    window_title = args.title.decode('utf8').encode('iso8859-15')

    app = QApplication(sys.argv)
    app.aboutToQuit.connect(appExiting)
    window = Window()

    window.resize(args.width, args.height)
    window.move(args.posx, args.posy)
    window.setWindowTitle(window_title)
    window.setWindowIcon(QIcon(APP_ICON_PATH))

    window.load_url(args.url)
    window.show()
    app.exec_()

if __name__ == "__main__":
    main()
