#!/usr/bin/python3
from json import dumps

inv = {
  'prod_frontend': {
    'hosts': ['toten', 'hamar']
  }, 'prod_backend': {
    'hosts': ['lofoten', 'narvik']
  }, 'prod_vpn': { # vpn/radius
    'hosts': ['bergen', 'molde']
  }, 'prod_db': {
    'hosts': ['hangar-22']
  }, 'prod': {
    'hosts': ['lost-islands'], # monitoring and internal DNS
    'children': [
      'prod_frontend', 'prod_backend', 'misc',
      'prod_vpn', 'prod_db', 'backups', 'monitor'
    ]
  },
  'misc': {
    'hosts': ['gulf-of-oman', 'deploy']
  }, 'backups': {
    'hosts': ['myrkdalen', 'backup.skyid.no']
  }, 'monitor': {
    'hosts': ['monitoring', 'smokeping.skyid.no']
  },
  'dev_frontend': { 'hosts': ['mercury'] },
  'dev_backend': { 'hosts': ['scrapmetal'] },
  'dev_vpn': { 'hosts': ['dawnbreaker'] },
  'dev_db': { 'hosts': ['propaganda'] },
  'dev': {
    'children': [
      'dev_frontend', 'dev_backend', 'dev_vpn', 'dev_db'
    ]
  },
  "_meta": {
    # since we're not doing hostvars this will make it a whole lot faster
    # as Ansible won't have to run this script with --host for each one
    "hostvars": {}
  }
}

def inventory():
  return dumps(inv, indent=2)

def group_vars(host):
  for group in inv.values():
    if host in group.get('hosts', []):
      return dumps(group.get('vars', {}), indent=2)
  return '{}'

if __name__ == '__main__':
  from argparse import ArgumentParser
  argparse = ArgumentParser()
  argparse.add_argument(
    '-l', '--list', action='store_true',
    help='Print the inventory to stdout')
  argparse.add_argument(
    '-v', '--host', type=str,
    help='Print host vars for a specific host')
  args = argparse.parse_args()
  if args.list:
    print(inventory())
  elif args.host:
    print(group_vars(args.host))
  else:
    argparse.print_help()
