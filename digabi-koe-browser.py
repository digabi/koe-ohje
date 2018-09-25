#!/usr/bin/python2
# -*- coding: utf-8 -*-

import argparse, sys, subprocess

from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWebKit import *
from PyQt5.QtWidgets import *
from PyQt5.QtWebKitWidgets import QWebView

from os.path import expanduser

APP_ICON_PATH='/usr/share/digabi-koe-ohje/help-browser.svg'
LOCAL_STORAGE_PATH="%s/.cache/digabi-koe" % expanduser("~")

class SharedClass (QObject):
    @pyqtSlot(str)
    def copy_html_to_clipboard(self, value):
        xclip = subprocess.Popen("xclip -selection clipboard -target text/html -i".split(" "), stdin=subprocess.PIPE, stdout=subprocess.PIPE, shell=False)
        try:
            xclip.stdin.write(value.toUtf8())
        except AttributeError:
            xclip.stdin.write(value)
        xclip.stdin.close()
        xclip.wait()

    @pyqtSlot(str)
    def copy_text_to_clipboard(self, value):
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
        self.frame = self.view.page().mainFrame()
        self.frame.javaScriptWindowObjectCleared.connect(self.add_shared_object)

    def load_url (self, url):
        self.view.load(QUrl(url))

    def add_shared_object(self):
        self.frame.addToJavaScriptWindowObject("sharedclass", self.sharedclass)

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
    parser.add_argument('-s', '--localstorage', dest='localstorage', type=bool, default=False, help='Write local storage to disk')
    parser.add_argument('-dev', '--devmode', dest='devmode', type=bool, default=False, help='Developer mode toggle')

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

    # Dev-environment debug variables
    if args.devmode:
        inspector = QWebInspector()
        window.view.page().settings().setAttribute(QWebSettings.DeveloperExtrasEnabled, True)
        inspector.setPage(window.view.page())
        inspector.showMaximized()

    # Enable LocalStorage
    if args.localstorage:
        window.view.page().settings().setLocalStoragePath(LOCAL_STORAGE_PATH)
        window.view.page().settings().setAttribute(QWebSettings.LocalStorageEnabled, True)

    window.load_url(args.url)
    window.show()
    app.exec_()

if __name__ == "__main__":
    main()
