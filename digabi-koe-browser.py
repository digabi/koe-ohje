#!/usr/bin/python2
# -*- coding: utf-8 -*-

import argparse, sys

from PyQt5.QtWebKitWidgets import QWebView
from PyQt5.QtWidgets import QApplication,QWidget,QVBoxLayout
from PyQt5.QtCore import *
from PyQt5.QtGui import QIcon

APP_ICON_PATH='/usr/share/icons/elementary-xfce/apps/128/help-browser.png'

class SharedClass (QObject):
    @pyqtSlot(str)
    def copy_to_clipboard(self, value):
        clipboard = QApplication.clipboard()
        clipboard.setText(value)

class Window (QWidget):
    def __init__(self):
        super(Window, self).__init__()
        self.view = QWebView(self)
        layout = QVBoxLayout(self)
        layout.addWidget(self.view)

        self.sharedclass = SharedClass(self)
        self.view.page().mainFrame().addToJavaScriptWindowObject("sharedclass", self.sharedclass)
        
    def load_url (self, url):
        self.view.load(QUrl(url))
    
def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-W', '--width', dest='width', type=int, default=500, help='Browser window width')
    parser.add_argument('-H', '--height', dest='height', type=int, default=300, help='Browser window height')
    parser.add_argument('-x', '--positionx', dest='posx', type=int, default=1, help='Window position (X)')
    parser.add_argument('-y', '--positiony', dest='posy', type=int, default=1, help='Window position (Y)')
    parser.add_argument('-t', '--title', dest='title', type=str, default="Help", help='Window title')
    parser.add_argument('url', type=str, help='URL of the help file')
    
    args = parser.parse_args()
    
    app = QApplication(sys.argv)
    window = Window()

    window.resize(args.width, args.height)
    window.move(args.posx, args.posy)
    window.setWindowTitle(args.title)
    window.setWindowIcon(QIcon(APP_ICON_PATH))
    
    window.load_url(args.url)
    window.show()
    app.exec_()

if __name__ == "__main__":
    main()

